from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

class Brand(models.Model):
	brand_name= models.CharField(max_length=100)
	description= models.TextField()
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Brand, self).save(*args, **kwargs)

class Tags(models.Model):
	tags_name=models.CharField(max_length=100)
	class Meta:
		ordering=('id',)
	def save(self, *args, **kwargs):
		super(Tags, self).save(*args, **kwargs)

class Type(models.Model):
	type_name=models.CharField(max_length=100)
	class Meta():
		ordering=('id',)
	def save(self, *args, **kwargs):
		super(Type, self).save(*args, **kwargs)

class Product(models.Model):
	product_name=models.CharField(max_length=100)
	type_id = models.ForeignKey('Type', related_name='product_id', on_delete=models.CASCADE, default='')
	description= models.TextField(default='')
	quantity=models.IntegerField(default='')
	brand_id = models.ForeignKey('Brand', related_name='product_id', on_delete=models.CASCADE)
	tag_id = models.ForeignKey('Tags', related_name='product_id', on_delete=models.CASCADE)
	supplier_id = models.ForeignKey('Supplier', related_name='product_id', on_delete=models.CASCADE, default='')
	product_price=models.IntegerField()
	supplier_price=models.IntegerField()
	create_date=models.DateField()
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Product, self).save(*args, **kwargs)

class Group(models.Model):
	group_name=models.CharField(max_length=100)
	no_customer=models.IntegerField()
	country=models.CharField(max_length=100)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Group, self).save(*args, **kwargs)

class Customer(models.Model):
	customer_name=models.CharField(max_length=100)
	description= models.TextField()
	company=models.CharField(max_length=100)
	phone=models.CharField(max_length=100)
	mobile=models.CharField(max_length=100)
	fax=models.TextField(max_length=100)
	email=models.CharField(max_length=100)
	date_of_birth=models.DateField()
	gender=models.CharField(max_length=100)
	road=models.CharField(max_length=100)
	street=models.CharField(max_length=100)
	suburb=models.CharField(max_length=100)
	city=models.CharField(max_length=100)
	post_code=models.CharField(max_length=100)
	state=models.CharField(max_length=100)
	country=models.CharField(max_length=100)
	group_id= models.ForeignKey('Group', related_name='customer_id', on_delete=models.CASCADE ,default='')
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Customer, self).save(*args, **kwargs)

class Supplier(models.Model):
	supplier_name=models.CharField(max_length=100)
	description= models.TextField()
	company=models.CharField(max_length=100)
	phone=models.CharField(max_length=100)
	mobile=models.CharField(max_length=100)
	fax=models.TextField(max_length=100)
	email=models.CharField(max_length=100)
	date_of_birth=models.DateField()
	gender=models.CharField(max_length=100)
	road=models.CharField(max_length=100)
	street=models.CharField(max_length=100)
	suburb=models.CharField(max_length=100)
	city=models.CharField(max_length=100)
	post_code=models.CharField(max_length=100)
	state=models.CharField(max_length=100)
	country=models.CharField(max_length=100)
	website=models.CharField(max_length=100)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Supplier, self).save(*args, **kwargs)

class SaleDetails(models.Model):
	product_id = models.ForeignKey('Product', related_name='saledetails_id', on_delete=models.CASCADE)
	quantity = models.IntegerField()
	sub_total = models.IntegerField()
	sales_id = models.ForeignKey('Sales', related_name='saledetails_id', on_delete=models.CASCADE)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(SaleDetails, self).save(*args, **kwargs)

# Sale fields
class Sales(models.Model):
	transaction_date = models.DateField(auto_now_add=True)
	subtotal = models.IntegerField(default='')
	tax = models.IntegerField(default='')
	discount = models.IntegerField(default='')
	items = models.IntegerField(default='')
	amount_paid = models.IntegerField(default='')
	paid = models.IntegerField(default='')
	repay = models.IntegerField(default='')
	staff_id = models.ForeignKey('Staff', related_name='sales_id', on_delete=models.CASCADE, default='')
	customer_id = models.ForeignKey('Customer', related_name='sales_id', on_delete=models.CASCADE, default='')
	register_id = models.ForeignKey('Register', related_name='sales_id', on_delete=models.CASCADE, default='')
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Sales, self).save(*args, **kwargs)

class Register(models.Model):
	status = models.CharField(max_length=100)
	opening_balance = models.IntegerField()
	opening_note = models.CharField(max_length=200)
	opening_time = models.TimeField(default="")
	closing_time = models.TimeField(default="")
	expected = models.IntegerField(blank=True, default="0")
	counted = models.IntegerField(blank=True, default="0")
	difference = models.IntegerField(blank=True, default="0")
	cash_payment_received = models.IntegerField(blank=True, default="0")
	store_credit = models.IntegerField(blank=True, default="0")
	total = models.IntegerField(blank=True, default="0")
	closing_note = models.CharField(max_length=200, blank=True, default="Closing note")
	transaction_date = models.DateTimeField(auto_now_add=True)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Register, self).save(*args, **kwargs)

class Staff(models.Model):
	username = models.CharField(max_length=100)
	email = models.CharField(max_length=100)
	password = models.CharField(max_length=200)
	rank = models.CharField(max_length=100, default="Web Developer")
	created_date = models.DateTimeField(auto_now_add=True)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Staff, self).save(*args, **kwargs)

