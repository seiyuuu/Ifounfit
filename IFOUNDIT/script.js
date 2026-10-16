function reportSubmitted() {
    let title = document.getElementById("Title").value.trim();
    let description = document.getElementById("Description").value.trim();
    let submitBtn = document.getElementById("submitBtn");

    // Check kung may laman
    if (title === "" || description === "") {
        alert("Please input information before submitting.");
    } else {
        // Dito magbabago ang button
        submitBtn.innerText = "REPORT SUBMITTED ✓";
        submitBtn.style.backgroundColor = "#10b981";
        submitBtn.style.cursor = "default";
        submitBtn.disabled = true;

        // Pagkatapos ng 1 segundo, lilipat sa dashboard
        setTimeout(function() {
            window.location.href = "dashboardfinal.html";
        }, 1000);
    }
}


function reportSubmittedd() {
    let title = document.getElementById("Title").value.trim();
    let description = document.getElementById("Description").value.trim();
    let submitBtn = document.getElementById("submitBtn");

    // Check kung may laman
    if (title === "" || description === "") {
        alert("Please input information before submitting.");
    } else {
        // Dito magbabago ang button
        submitBtn.innerText = "REPORT SUBMITTED ✓";
        submitBtn.style.backgroundColor = "#10b981";
        submitBtn.style.cursor = "default";
        submitBtn.disabled = true;

        // Pagkatapos ng 1 segundo, lilipat sa dashboard
        setTimeout(function() {
            window.location.href = "dashboardfinal.html";
        }, 1000);
    }
}

//claim request final
function reportSubmitteddd() {
   
        submitBtn.innerText = "REPORT SUBMITTED ✓";
        submitBtn.style.backgroundColor = "#10b981";
        submitBtn.style.cursor = "default";
        submitBtn.disabled = true;

       
        setTimeout(function() {
            window.location.href = "dashboardfinal.html";
        }, 1000);
    
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const itemsContainer = document.getElementById('itemsContainer');
    const listViewBtn = document.getElementById("listViewBtn");
    const gridViewBtn = document.getElementById("gridViewBtn");
    const itemCards = document.querySelectorAll('.item-card');

    // Search and Category Filtering 
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        itemCards.forEach(card => {
            const title = card.querySelector('.item-title')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.item-location')?.textContent.toLowerCase() || '';
            const category = card.getAttribute('data-category') || '';

            const matchesSearch = title.includes(searchTerm) || location.includes(searchTerm);
            const matchesCategory = selectedCategory === 'ALL' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterItems);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterItems);
    }

    // List View vs Grid View
    if (listViewBtn && gridViewBtn && itemsContainer) {
        listViewBtn.addEventListener("click", function () {
            itemsContainer.classList.remove("grid-view");
            itemsContainer.classList.add("list-view");

            listViewBtn.classList.add("active");
            gridViewBtn.classList.remove("active");
        });

        gridViewBtn.addEventListener("click", function () {
            itemsContainer.classList.remove("list-view");
            itemsContainer.classList.add("grid-view");

            gridViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const itemsContainer = document.getElementById('itemsContainer');
    const listViewBtn = document.getElementById("listViewBtn");
    const gridViewBtn = document.getElementById("gridViewBtn");
    const itemCards = Array.from(document.querySelectorAll('.item-card'));
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    let currentPage = 1;
    const itemsPerPage = 8; // 8 items bawat pahina para maging 2 pages lahat (16 items total)

    function getFilteredCards() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categoryFilter ? categoryFilter.value : 'ALL';

        return itemCards.filter(card => {
            const title = card.querySelector('.item-title')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.item-location')?.textContent.toLowerCase() || '';
            const category = card.getAttribute('data-category') || '';

            const matchesSearch = title.includes(searchTerm) || location.includes(searchTerm);
            const matchesCategory = selectedCategory === 'ALL' || category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }

    function displayPagination() {
        const filteredCards = getFilteredCards();
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        if (currentPage < 1) currentPage = 1;

        // Itago muna lahat ng cards
        itemCards.forEach(card => card.style.display = 'none');

        // I-display lang ang mga kasama sa current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCards = filteredCards.slice(start, end);

        paginatedCards.forEach(card => card.style.display = '');

        // Render Page Number Buttons
        if (pageNumbersContainer) {
            pageNumbersContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.className = `num-btn ${i === currentPage ? 'active' : ''}`;
                btn.addEventListener('click', () => {
                    currentPage = i;
                    displayPagination();
                });
                pageNumbersContainer.appendChild(btn);
            }
        }

        // I-enable o i-disable ang Prev/Next buttons
        if (prevBtn) prevBtn.disabled = currentPage === 1 || totalPages === 0;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Global function para sa buttons
    window.changePage = function(direction) {
        currentPage += direction;
        displayPagination();
    };

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            displayPagination();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            currentPage = 1;
            displayPagination();
        });
    }

    // View Switcher Logic
    if (listViewBtn && gridViewBtn && itemsContainer) {
        listViewBtn.addEventListener("click", function () {
            itemsContainer.classList.remove("grid-view");
            itemsContainer.classList.add("list-view");
            listViewBtn.classList.add("active");
            gridViewBtn.classList.remove("active");
        });

        gridViewBtn.addEventListener("click", function () {
            itemsContainer.classList.remove("list-view");
            itemsContainer.classList.add("grid-view");
            gridViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
        });
    }

    // Initial call
    displayPagination();
});