from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions, renderers, viewsets
from rest_framework.response import Response

from Application.models import Brand, Tags, Type, Product, Group, Customer, Supplier, SaleDetails, Sales, Register, Staff
from Application.serializers import BrandSerializer, TagsSerializer, TypeSerializer, ProductSerializer, GroupSerializer, CustomerSerializer,SupplierSerializer, SaleDetailsSerializer, SalesSerializer, RegisterSerializer, StaffSerializer
from Application.permissions import IsOwnerOrReadOnly

class BrandViewSet(viewsets.ModelViewSet):
	queryset = Brand.objects.all()
	serializer_class = BrandSerializer

class TagsViewSet(viewsets.ModelViewSet):
	queryset = Tags.objects.all()
	serializer_class = TagsSerializer

class TypeViewSet(viewsets.ModelViewSet):
	queryset = Type.objects.all()
	serializer_class = TypeSerializer

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class GroupViewSet(viewsets.ModelViewSet):
	queryset = Group.objects.all()
	serializer_class = GroupSerializer

class CustomerViewSet(viewsets.ModelViewSet):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer

class SupplierViewSet(viewsets.ModelViewSet):
	queryset = Supplier.objects.all()
	serializer_class = SupplierSerializer

# Sale Views
class SaleDetailsViewSet(viewsets.ModelViewSet):
	queryset = SaleDetails.objects.all()
	serializer_class = SaleDetailsSerializer

class SalesViewSet(viewsets.ModelViewSet):
	queryset = Sales.objects.all()
	serializer_class = SalesSerializer
	
class RegisterViewSet(viewsets.ModelViewSet):
	queryset = Register.objects.all()
	serializer_class = RegisterSerializer

class StaffViewSet(viewsets.ModelViewSet):
	queryset = Staff.objects.all()
	serializer_class = StaffSerializer
