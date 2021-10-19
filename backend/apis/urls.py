from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import SignInView, UsageListCreateView, UsageRetrieveUpdateDestroyView, UsageTypeListView

urlpatterns = [
	path('login', SignInView.as_view(), name="login"),
	path('refresh-token', TokenRefreshView.as_view(), name="refresh_token"),
	path('usage-types', UsageTypeListView.as_view(), name="usage_types"),
	path('usages', UsageListCreateView.as_view(), name="usages"),
	path('usages/<int:id>', UsageRetrieveUpdateDestroyView.as_view(), name="usages"),
]
