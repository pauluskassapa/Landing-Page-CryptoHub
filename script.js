// Global variables
        let cryptoData = [];
        let filteredCrypto = [];
        let currentPage = 'home';

        // Page navigation
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.add('hidden');
            });

            // Show selected page
            document.getElementById(pageName + '-page').classList.remove('hidden');

            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            event.target.classList.add('active');
            currentPage = pageName;

            // Load crypto data when products page is accessed
            if (pageName === 'products' && cryptoData.length === 0) {
                fetchCryptoData();
            }
        }

        // Fetch cryptocurrency data
        async function fetchCryptoData() {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1');
                const data = await response.json();
                cryptoData = data;
                filteredCrypto = data;
                displayCrypto(filteredCrypto);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
                // Fallback mock data
                const mockData = [
                    {
                        id: 'bitcoin',
                        name: 'Bitcoin',
                        symbol: 'BTC',
                        current_price: 43250,
                        price_change_percentage_24h: 2.5,
                        market_cap: 850000000000,
                        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
                    },
                    {
                        id: 'ethereum',
                        name: 'Ethereum',
                        symbol: 'ETH',
                        current_price: 2580,
                        price_change_percentage_24h: -1.2,
                        market_cap: 310000000000,
                        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
                    },
                    {
                        id: 'binancecoin',
                        name: 'BNB',
                        symbol: 'BNB',
                        current_price: 315,
                        price_change_percentage_24h: 0.8,
                        market_cap: 48000000000,
                        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
                    },
                    {
                        id: 'cardano',
                        name: 'Cardano',
                        symbol: 'ADA',
                        current_price: 0.45,
                        price_change_percentage_24h: -3.2,
                        market_cap: 15000000000,
                        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
                    },
                    {
                        id: 'solana',
                        name: 'Solana',
                        symbol: 'SOL',
                        current_price: 98.5,
                        price_change_percentage_24h: 5.7,
                        market_cap: 42000000000,
                        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
                    }
                ];
                cryptoData = mockData;
                filteredCrypto = mockData;
                displayCrypto(filteredCrypto);
            }
        }

        // Display cryptocurrency data
        function displayCrypto(data) {
            const cryptoList = document.getElementById('cryptoList');
            
            if (data.length === 0) {
                cryptoList.innerHTML = `
                    <div style="text-align: center; padding: 3rem; color: #9ca3af;">
                        <p>Tidak ada cryptocurrency yang ditemukan.</p>
                    </div>
                `;
                return;
            }

            cryptoList.innerHTML = data.map(crypto => `
                <div class="crypto-card">
                    <div class="crypto-info">
                        <img src="${crypto.image}" alt="${crypto.name}" class="crypto-icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNTYzZWIiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMkwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEyTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K'">
                        <div class="crypto-details">
                            <h3>${crypto.name}</h3>
                            <p>${crypto.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <div class="crypto-price">
                        <div class="price">${formatPrice(crypto.current_price)}</div>
                        <div class="price-change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}">
                            ${crypto.price_change_percentage_24h >= 0 ? '+' : ''}${crypto.price_change_percentage_24h.toFixed(2)}%
                        </div>
                    </div>
                    <div style="text-align: right; margin-left: 1rem;">
                        <div style="color: #9ca3af; font-size: 0.875rem;">Market Cap</div>
                        <div style="color: #ffffff; font-weight: 600; font-size: 0.875rem;">${formatMarketCap(crypto.market_cap)}</div>
                    </div>
                </div>
            `).join('');
        }

        // Filter cryptocurrency data
        function filterCrypto() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            filteredCrypto = cryptoData.filter(crypto => 
                crypto.name.toLowerCase().includes(searchTerm) ||
                crypto.symbol.toLowerCase().includes(searchTerm)
            );
            displayCrypto(filteredCrypto);
        }

        // Format price
        function formatPrice(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price);
        }

        // Format market cap
        function formatMarketCap(marketCap) {
            if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
            if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`;
            if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`;
            return `${marketCap.toFixed(2)}`;
        }

        // Mobile menu toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = '#0f172a';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                navLinks.style.display = 'none';
            }
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav-links').style.display = 'none';
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.backgroundColor = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.boxShadow = 'none';
            } else {
                navLinks.style.display = 'none';
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial page
            showPage('home');
            
            // Add smooth scrolling for better UX
            document.documentElement.style.scrollBehavior = 'smooth';
        });