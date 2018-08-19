import featuring.application

# Create base Flask app.
app = featuring.application.make_app()
bcrypt = app.bcrypt
db = app.db

# Prepare entities layer.
import featuring.entities.client.models # noqa
import featuring.entities.ticket.models # noqa
import featuring.entities.user.models # noqa
import featuring.entities.product.models # noqa

# Mount APIs layer
import featuring.api.v1 # noqa
featuring.application.mount_apis(app)

# Prepare admin commands layer.
import featuring.commands # noqa
