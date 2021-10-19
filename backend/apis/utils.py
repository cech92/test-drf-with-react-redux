from rest_framework import pagination, serializers


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)

        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class DefaultPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'limit'
    max_page_size = 100
    page_query_param = 'page'
