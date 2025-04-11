// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert before nav
        header.insertBefore(mobileMenuBtn, nav);
        
        // Add toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on state
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Add CSS for mobile menu
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 101;
                }
                
                nav {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 80%;
                    height: 100vh;
                    background-color: #fff;
                    z-index: 100;
                    transition: left 0.3s ease;
                    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
                    padding: 80px 20px 20px;
                }
                
                nav.active {
                    left: 0;
                }
                
                nav ul {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                nav ul li {
                    margin: 10px 0;
                    width: 100%;
                }
                
                nav ul li a {
                    display: block;
                    padding: 10px 0;
                    font-size: 18px;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Check if screen width is mobile size
    if (window.innerWidth <= 768) {
        createMobileNav();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileNav();
        }
    });
    
    // Product Image Slider (if available)
    const createProductSlider = () => {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const image = card.querySelector('.product-image img');
            const originalSrc = image.src;
            
            // Simulate multiple images with color variations
            const imageSources = [
                originalSrc,
                originalSrc.replace('.jpg', '-2.jpg'),
                originalSrc.replace('.jpg', '-3.jpg')
            ];
            
            // Create color selector dots
            const colorSelector = document.createElement('div');
            colorSelector.className = 'color-selector';
            
            // Add color dots
            const colors = ['#333', '#986D5B', '#4A6C8A'];
            colors.forEach((color, index) => {
                const dot = document.createElement('span');
                dot.style.backgroundColor = color;
                dot.dataset.index = index;
                
                // Set first dot as active
                if (index === 0) {
                    dot.classList.add('active');
                }
                
                // Add click event to change image
                dot.addEventListener('click', function() {
                    // Remove active class from all dots
                    colorSelector.querySelectorAll('span').forEach(d => d.classList.remove('active'));
                    // Add active class to clicked dot
                    this.classList.add('active');
                    
                    // Change image (in a real implementation, we would check if the image exists)
                    // For demo purposes, we'll just pretend we're changing the image
                    image.style.opacity = '0';
                    setTimeout(() => {
                        image.style.opacity = '1';
                    }, 300);
                });
                
                colorSelector.appendChild(dot);
            });
            
            // Add color selector to product info
            const productInfo = card.querySelector('.product-info');
            productInfo.appendChild(colorSelector);
            
            // Add CSS for color selector
            const style = document.createElement('style');
            style.textContent = `
                .color-selector {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }
                
                .color-selector span {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                
                .color-selector span.active {
                    border-color: #333;
                    transform: scale(1.2);
                }
                
                .product-image img {
                    transition: opacity 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        });
    };
    
    // Initialize product sliders if products exist
    if (document.querySelector('.product-card')) {
        createProductSlider();
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Basic validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            // Display thank you message (in real implementation, you'd send this to a server)
            const newsletterContent = document.querySelector('.newsletter-content');
            newsletterContent.innerHTML = `
                <h2>Thank You for Subscribing!</h2>
                <p>Your email (${email}) has been added to our newsletter list. You'll receive a 10% discount code shortly.</p>
                <div class="checkmark">
                    <i class="fas fa-check-circle"></i>
                </div>
            `;
            
            // Add CSS for thank you message
            const style = document.createElement('style');
            style.textContent = `
                .checkmark {
                    font-size: 60px;
                    color: #4CAF50;
                    margin: 30px 0;
                    animation: scaleUp 0.5s ease;
                }
                
                @keyframes scaleUp {
                    0% { transform: scale(0); }
                    70% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // Shopping Cart Functionality
    const setupCartFunctionality = () => {
        const cartButtons = document.querySelectorAll('.overlay-btn:first-child');
        const cartCount = document.querySelector('.cart-count');
        let count = 0;
        
        cartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product info
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Increment cart count
                count++;
                cartCount.textContent = count;
                
                // Animate cart icon
                const cartIcon = document.querySelector('.icons a:nth-child(2)');
                cartIcon.classList.add('bump');
                setTimeout(() => {
                    cartIcon.classList.remove('bump');
                }, 300);
                
                // Show added to cart notification
                const notification = document.createElement('div');
                notification.className = 'cart-notification';
                notification.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>${productName}</h4>
                        <p>Added to your cart - ${productPrice}</p>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.classList.add('hide');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 3000);
            });
        });
        
        // Add CSS for cart functionality
        const style = document.createElement('style');
        style.textContent = `
            .bump {
                animation: bump 0.3s ease;
            }
            
            @keyframes bump {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            .cart-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #fff;
                padding: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 15px;
                z-index: 100;
                animation: slideIn 0.3s ease;
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .cart-notification.hide {
                opacity: 0;
                transform: translateX(100px);
            }
            
            .cart-notification i {
                font-size: 24px;
                color: #4CAF50;
            }
            
            .cart-notification h4 {
                margin-bottom: 5px;
            }
            
            .cart-notification p {
                font-size: 14px;
                color: #666;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize cart functionality if product cards exist
    if (document.querySelector('.product-card')) {
        setupCartFunctionality();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Product quick view functionality
    const setupQuickViewFunctionality = () => {
        // Create quick view button for each product
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productOverlay = card.querySelector('.product-overlay');
            const quickViewBtn = document.createElement('a');
            quickViewBtn.href = '#';
            quickViewBtn.className = 'overlay-btn quick-view-btn';
            quickViewBtn.innerHTML = '<i class="fas fa-eye"></i> Quick View';
            
            // Insert between add to cart and wishlist buttons
            productOverlay.insertBefore(quickViewBtn, productOverlay.lastChild);
            
            // Create quick view modal
            quickViewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product info
                const productImage = card.querySelector('.product-image img').src;
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price').textContent;
                const rating = card.querySelector('.rating').innerHTML;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'quick-view-modal';
                modal.innerHTML = `
                    <div class="quick-view-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-layout">
                            <div class="modal-image">
                                <img src="${productImage}" alt="${productName}">
                            </div>
                            <div class="modal-info">
                                <h2>${productName}</h2>
                                <p class="modal-price">${productPrice}</p>
                                <div class="modal-rating">${rating}</div>
                                <p class="modal-description">
                                    This beautiful piece from our latest collection is designed to make you look and feel your best.
                                    Made with premium materials that ensure comfort and durability.
                                </p>
                                <div class="modal-sizes">
                                    <h4>Size:</h4>
                                    <div class="size-options">
                                        <button>XS</button>
                                        <button>S</button>
                                        <button class="selected">M</button>
                                        <button>L</button>
                                        <button>XL</button>
                                    </div>
                                </div>
                                <div class="modal-colors">
                                    <h4>Color:</h4>
                                    <div class="color-options">
                                        <span style="background-color: #333" class="selected"></span>
                                        <span style="background-color: #986D5B"></span>
                                        <span style="background-color: #4A6C8A"></span>
                                    </div>
                                </div>
                                <div class="modal-quantity">
                                    <h4>Quantity:</h4>
                                    <div class="quantity-selector">
                                        <button class="qty-btn minus">-</button>
                                        <input type="number" value="1" min="1" max="10">
                                        <button class="qty-btn plus">+</button>
                                    </div>
                                </div>
                                <div class="modal-buttons">
                                    <button class="btn add-to-cart-btn">
                                        <i class="fas fa-shopping-bag"></i> Add to Cart
                                    </button>
                                    <button class="btn-outline wishlist-btn">
                                        <i class="fas fa-heart"></i> Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add modal to body
                document.body.appendChild(modal);
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
                
                // Show modal with animation
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                // Close modal functionality
                const closeModal = () => {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                    }, 300);
                };
                
                // Close on X click
                modal.querySelector('.close-modal').addEventListener('click', closeModal);
                
                // Close on outside click
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
                
                // Quantity buttons functionality
                const quantityInput = modal.querySelector('.quantity-selector input');
                modal.querySelector('.qty-btn.minus').addEventListener('click', function() {
                    if (quantityInput.value > 1) {
                        quantityInput.value--;
                    }
                });
                
                modal.querySelector('.qty-btn.plus').addEventListener('click', function() {
                    if (quantityInput.value < 10) {
                        quantityInput.value++;
                    }
                });
                
                // Size selection
                modal.querySelectorAll('.size-options button').forEach(btn => {
                    btn.addEventListener('click', function() {
                        modal.querySelectorAll('.size-options button').forEach(b => b.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                });
                
                // Color selection
                modal.querySelectorAll('.color-options span').forEach(span => {
                    span.addEventListener('click', function() {
                        modal.querySelectorAll('.color-options span').forEach(s => s.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                });
                
                // Add to cart functionality
                modal.querySelector('.add-to-cart-btn').addEventListener('click', function() {
                    const cartCount = document.querySelector('.cart-count');
                    const currentCount = parseInt(cartCount.textContent);
                    cartCount.textContent = currentCount + parseInt(quantityInput.value);
                    
                    // Show added to cart message
                    const messageContainer = document.createElement('div');
                    messageContainer.className = 'modal-message';
                    messageContainer.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>Added to your cart!</p>
                    `;
                    
                    const modalInfo = modal.querySelector('.modal-info');
                    modalInfo.appendChild(messageContainer);
                    
                    // Remove message after 2 seconds
                    setTimeout(() => {
                        closeModal();
                    }, 1500);
                });
            });
        });
        
        // Add CSS for quick view
        const style = document.createElement('style');
        style.textContent = `
            .quick-view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .quick-view-modal.active {
                opacity: 1;
            }
            
            .quick-view-content {
                background-color: #fff;
                border-radius: 8px;
                width: 90%;
                max-width: 1000px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: modalIn 0.3s ease forwards;
                transform: translateY(50px);
                opacity: 0;
            }
            
            .quick-view-modal.active .quick-view-content {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes modalIn {
                to { transform: translateY(0); opacity: 1; }
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                z-index: 1;
            }
            
            .modal-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                padding: 30px;
            }
            
            .modal-image img {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }
            
            .modal-info h2 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .modal-price {
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 10px;
            }
            
            .modal-description {
                margin: 20px 0;
                color: #666;
                line-height: 1.6;
            }
            
            .modal-sizes,
            .modal-colors,
            .modal-quantity {
                margin-bottom: 20px;
            }
            
            .modal-sizes h4,
            .modal-colors h4,
            .modal-quantity h4 {
                margin-bottom: 10px;
            }
            
            .size-options {
                display: flex;
                gap: 10px;
            }
            
            .size-options button {
                width: 40px;
                height: 40px;
                border: 1px solid #ddd;
                background-color: #fff;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .size-options button.selected,
            .size-options button:hover {
                background-color: #333;
                color: #fff;
                border-color: #333;
            }
            
            .color-options {
                display: flex;
                gap: 10px;
            }
            
            .color-options span {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .color-options span.selected,
            .color-options span:hover {
                transform: scale(1.2);
                border-color: #333;
            }
            
            .quantity-selector {
                display: flex;
                align-items: center;
                width: fit-content;
            }
            
            .qty-btn {
                width: 30px;
                height: 30px;
                background-color: #f1f1f1;
                border: none;
                font-size: 16px;
                cursor: pointer;
            }
            
            .qty-btn.minus {
                border-radius: 4px 0 0 4px;
            }
            
            .qty-btn.plus {
                border-radius: 0 4px 4px 0;
            }
            
            .quantity-selector input {
                width: 50px;
                height: 30px;
                text-align: center;
                border: 1px solid #f1f1f1;
                border-left: none;
                border-right: none;
            }
            
            .modal-buttons {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            .modal-message {
                margin-top: 20px;
                text-align: center;
                color: #4CAF50;
                animation: fadeIn 0.5s ease;
            }
            
            .modal-message i {
                font-size: 40px;
                margin-bottom: 10px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .modal-layout {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize quick view functionality if product cards exist
    if (document.querySelector('.product-card')) {
        setupQuickViewFunctionality();
    }
});