from featuring.entities.product.models import Product


# --------------------------------------------------------------------------------------------------
# Product CRUD
# --------------------------------------------------------------------------------------------------

def retrieve_all_products():
    return Product.query.order_by(Product.product_name)
