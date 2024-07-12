document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const formContainer = document.getElementById('form-container');
    const carouselContainer = document.getElementById('carousel-container');
    const categoryContainer = document.getElementById('category-container');
    const salesContainer = document.getElementById('sales-container');
    const categoriesDiv = document.getElementById('categories');
    const showHomeLink = document.getElementById('show-home');
    const showProductsLink = document.getElementById('show-products');
    const showCategoriesLink = document.getElementById('show-categories');
    const showFormLink = document.getElementById('show-form');
    const showSalesLink = document.getElementById('show-sales');
    const productForm = document.getElementById('product-form');

    // Función para crear una tarjeta de producto
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const productImage = document.createElement('img');
        productImage.src = product.imagen;
        productImage.alt = product.nombre;

        const productName = document.createElement('h2');
        productName.textContent = product.nombre;

        const productCategory = document.createElement('p');
        productCategory.textContent = `Categoría: ${product.categoria_id}`;

        const productPrice = document.createElement('p');
        productPrice.className = 'price';
        productPrice.textContent = `$${product.precio}`;

        const productStock = document.createElement('p');
        productStock.textContent = `Stock: ${product.stock}`;

        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.textContent = 'Comprar';

        card.appendChild(productImage);
        card.appendChild(productName);
        card.appendChild(productCategory);
        card.appendChild(productPrice);
        card.appendChild(productStock);
        card.appendChild(buyButton);

        return card;
    }

    // Función para obtener los productos desde la API
    function fetchProducts() {
        fetch('http://localhost:3000/productos')
            .then(response => response.json())
            .then(products => {
                productContainer.innerHTML = '';
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productContainer.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error al obtener los productos:', error));
    }

    // Función para agregar un nuevo producto
    function addProduct(event) {
        event.preventDefault();

        const newProduct = {
            nombre: productForm.nombre.value,
            categoria_id: parseInt(productForm.categoria.value),
            precio: parseFloat(productForm.precio.value),
            stock: parseInt(productForm.stock.value),
            imagen: productForm.imagen.value
        };

        fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
            productForm.reset();
            showProductsSection();
        })
        .catch(error => console.error('Error al agregar el producto:', error));
    }

    // Función para mostrar la sección de productos
    function showProductsSection() {
        productContainer.style.display = 'flex';
        formContainer.style.display = 'none';
        carouselContainer.style.display = 'none';
        categoryContainer.style.display = 'none';
        salesContainer.style.display = 'none';
        fetchProducts();
    }

    // Función para mostrar la sección de formulario
    function showFormSection() {
        productContainer.style.display = 'none';
        formContainer.style.display = 'block';
        carouselContainer.style.display = 'none';
        categoryContainer.style.display = 'none';
        salesContainer.style.display = 'none';
    }

    // Función para mostrar la sección de categorías
    function showCategoriesSection() {
        productContainer.style.display = 'none';
        formContainer.style.display = 'none';
        carouselContainer.style.display = 'none';
        categoryContainer.style.display = 'flex';
        salesContainer.style.display = 'none';
    
        fetch('http://localhost:3000/categorias')
            .then(response => response.json())
            .then(categories => {
                categoriesDiv.innerHTML = '';
                categories.forEach(category => {
                    const categoryCard = document.createElement('div');
                    categoryCard.className = 'category-card';
    
                    const categoryImage = document.createElement('img');
                    categoryImage.src = category.imagen; // URL de la imagen
                    categoryImage.alt = category.nombre;
    
                    const categoryName = document.createElement('h3');
                    categoryName.textContent = category.nombre;
    
                    categoryCard.appendChild(categoryImage);
                    categoryCard.appendChild(categoryName);
                    categoriesDiv.appendChild(categoryCard);
                });
            })
            .catch(error => console.error('Error al obtener las categorías:', error));
    }
    

    // Función para mostrar la sección de inicio (carrusel)
    function showHomeSection() {
        productContainer.style.display = 'none';
        formContainer.style.display = 'none';
        carouselContainer.style.display = 'flex';
        categoryContainer.style.display = 'none';
        salesContainer.style.display = 'none';
    
        fetch('http://localhost:3000/productos?destacado=true')
            .then(response => response.json())
            .then(products => {
                const carousel = document.getElementById('carousel');
                carousel.innerHTML = '';
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    carousel.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error al obtener los productos destacados:', error));
    }    

    // Función para mostrar la sección de ventas
    function showSalesSection() {
        productContainer.style.display = 'none';
        formContainer.style.display = 'none';
        carouselContainer.style.display = 'none';
        categoryContainer.style.display = 'none';
        salesContainer.style.display = 'flex';
    
        fetch('http://localhost:3000/ventas')
            .then(response => response.json())
            .then(sales => {
                const salesTableBody = document.querySelector('#sales-table tbody');
                salesTableBody.innerHTML = '';
                sales.forEach(sale => {
                    const saleRow = document.createElement('tr');
    
                    const saleIdCell = document.createElement('td');
                    saleIdCell.textContent = sale.id;
                    saleIdCell.setAttribute('data-label', 'Venta ID');
    
                    const productIdCell = document.createElement('td');
                    productIdCell.textContent = sale.producto_id;
                    productIdCell.setAttribute('data-label', 'Producto ID');
    
                    const userIdCell = document.createElement('td');
                    userIdCell.textContent = sale.usuario_id;
                    userIdCell.setAttribute('data-label', 'Usuario ID');
    
                    const quantityCell = document.createElement('td');
                    quantityCell.textContent = sale.cantidad;
                    quantityCell.setAttribute('data-label', 'Cantidad');
    
                    const dateCell = document.createElement('td');
                    dateCell.textContent = sale.fecha;
                    dateCell.setAttribute('data-label', 'Fecha');
    
                    saleRow.appendChild(saleIdCell);
                    saleRow.appendChild(productIdCell);
                    saleRow.appendChild(userIdCell);
                    saleRow.appendChild(quantityCell);
                    saleRow.appendChild(dateCell);
    
                    salesTableBody.appendChild(saleRow);
                });
            })
            .catch(error => console.error('Error al obtener las ventas:', error));
    }    
    

    // Event listeners para los enlaces de navegación
    showHomeLink.addEventListener('click', (event) => {
        event.preventDefault();
        showHomeSection();
    });

    showProductsLink.addEventListener('click', (event) => {
        event.preventDefault();
        showProductsSection();
    });

    showCategoriesLink.addEventListener('click', (event) => {
        event.preventDefault();
        showCategoriesSection();
    });

    showFormLink.addEventListener('click', (event) => {
        event.preventDefault();
        showFormSection();
    });

    showSalesLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSalesSection();
    });

    // Event listener para el formulario
    productForm.addEventListener('submit', addProduct);

    // Mostrar productos al cargar la página
    showProductsSection();
});

     

  



