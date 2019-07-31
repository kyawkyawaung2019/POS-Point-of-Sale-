from django.contrib.auth.models import User
from rest_framework import serializers
from Application.models import Brand, Tags, Type, Product, Group, Customer, Supplier, SaleDetails, Sales, Register, Staff

class BrandSerializer(serializers.ModelSerializer):
	product_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Brand
		fields = ('id', 'brand_name', 'description', 'product_id')

class TagsSerializer(serializers.HyperlinkedModelSerializer):
	product_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Tags
		fields = ('id', 'tags_name', 'product_id')

class TypeSerializer(serializers.ModelSerializer):
	product_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Type
		fields = ('id', 'type_name', 'product_id')

class ProductSerializer(serializers.ModelSerializer):
	saledetails_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Product
		fields = ('id', 'product_name', 'type_id','description', 'quantity', 'brand_id', 'tag_id', 'supplier_id', 'product_price', 'supplier_price', 'create_date', 'saledetails_id')

class GroupSerializer(serializers.ModelSerializer):
	customer_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Group
		fields = ('id', 'group_name', 'no_customer', 'country', 'customer_id')

class CustomerSerializer(serializers.ModelSerializer):
	sales_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Customer
		fields = ('id', 'customer_name', 'description','company', 'phone', 'mobile', 'fax', 'email','date_of_birth', 'gender','road', 'street', 'suburb','city','post_code','state','country', 'group_id', 'sales_id')

class SupplierSerializer(serializers.ModelSerializer):
	product_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Supplier
		fields = ('id', 'supplier_name','product_id', 'description','company', 'phone', 'mobile', 'fax', 'email','date_of_birth', 'gender','road', 'street', 'suburb','city','post_code','state','country','website')

class SaleDetailsSerializer(serializers.ModelSerializer):
	class Meta:
		model = SaleDetails
		fields = ('id', 'sales_id', 'product_id', 'quantity', 'sub_total')

# Sale fields
class SalesSerializer(serializers.ModelSerializer):
	saledetails_id = SaleDetailsSerializer(many=True, read_only=True)
	class Meta:
		model = Sales
		fields = ('id', 'transaction_date', 'subtotal', 'tax', 'discount', 'items', 'amount_paid', 'paid', 'repay', 'staff_id', 'customer_id', 'register_id', 'saledetails_id')

class RegisterSerializer(serializers.ModelSerializer):
	sales_id = SalesSerializer(many=True, read_only=True)
	class Meta:
		model = Register
		fields = ('id', 'status', 'opening_balance', 'opening_note', 'opening_time', 'closing_time', 'expected', 'counted', 'difference', 'cash_payment_received', 'store_credit', 'total', 'closing_note','transaction_date', 'sales_id')

class StaffSerializer(serializers.ModelSerializer):
	sales_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model = Staff
		fields = ('id', 'username', 'email', 'password', 'rank', 'created_date', 'sales_id')
