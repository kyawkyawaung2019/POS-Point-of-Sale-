from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from Application import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'Brand', views.BrandViewSet)
router.register(r'Tags', views.TagsViewSet)
router.register(r'Type', views.TypeViewSet)
router.register(r'Product', views.ProductViewSet)
router.register(r'Group', views.GroupViewSet)
router.register(r'Customer', views.CustomerViewSet)
router.register(r'Supplier', views.SupplierViewSet)
router.register(r'SaleDetails', views.SaleDetailsViewSet)
router.register(r'Sales', views.SalesViewSet)
router.register(r'Register', views.RegisterViewSet)
router.register(r'Staff', views.StaffViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls))
]

