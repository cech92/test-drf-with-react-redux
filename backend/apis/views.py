import logging

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils import DefaultPagination, UsageFilter

from apis.models import Usage, UsageType
from apis.serializers import UsageSerializer, SignInSerializer, UsageCreateUpdateSerializer, UsageTypeSerializer

logger = logging.getLogger('error')


class SignInView(TokenObtainPairView):
	serializer_class = SignInSerializer


class UsageTypeListView(ListAPIView):
	queryset = UsageType.objects.all()
	serializer_class = UsageTypeSerializer
	pagination_class = DefaultPagination
	permission_classes = [IsAuthenticated]
	filter_backends = [filters.OrderingFilter]
	ordering_fields = ['name, unit']
	ordering = ['name']

	def get_queryset(self):
		queryset = UsageType.objects.all()
		queryset = self.filter_queryset(queryset)
		return queryset

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		count = queryset.count()
		serializer = UsageTypeSerializer(queryset, many=True)
		return Response(data={"count": count, "results": serializer.data}, status=status.HTTP_200_OK)


class UsageListCreateView(ListCreateAPIView):
	lookup_fields = ["usage_start_date", "usage_end_date", "user_id", "usage_type"]
	queryset = Usage.objects.all()
	serializer_class = UsageSerializer
	pagination_class = DefaultPagination
	# filterset_fields = ['usage_type', 'user']
	filterset_class = UsageFilter
	ordering_fields = '__all__'
	ordering = ['usage_at']
	filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user_id = self.request.user
		queryset = Usage.objects.filter(user_id=user_id)
		sort = self.request.query_params.get('sort', 'id')
		queryset = queryset.order_by(sort)
		return queryset

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		queryset = self.filter_queryset(queryset)
		count = queryset.count()
		queryset = self.paginate_queryset(queryset)
		serializer = UsageSerializer(queryset, many=True)
		return Response(data={"count": count, "results": serializer.data}, status=status.HTTP_200_OK)

	def create(self, request, *args, **kwargs):
		serializer = UsageCreateUpdateSerializer(data=request.data)
		if serializer.is_valid():
			self.perform_create(serializer)
			headers = self.get_success_headers(serializer.data)
			return Response(data=serializer.data, status=status.HTTP_201_CREATED, headers=headers)
		else:
			logger.error(serializer.errors)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsageRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
	lookup_field = "id"
	queryset = Usage.objects.all()
	serializer_class = UsageSerializer
	permission_classes = [IsAuthenticated]

	def update(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = UsageCreateUpdateSerializer(instance=instance, data=request.data, partial=True)
		if serializer.is_valid():
			self.perform_update(serializer)
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			logger.error(serializer.errors)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

