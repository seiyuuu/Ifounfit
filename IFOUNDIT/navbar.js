document.addEventListener("DOMContentLoaded", function()) {
    const navbarHTML = 
        <header class="dashboard-navbar">
            <a href="dashboardfinal.html" class="dashboard-logo-area">
                <img src="LOGO.png" alt="IFoundIT Logo">
                <span>IFoundIT</span>
            </a>
            
            <nav class="dashboard-nav-links">
                <a href="dashboardfinal.html" id="nav-dashboard">DASHBOARD</a>
                
                <div class="dropdown">
                    <a href="#" id="nav-report">REPORT <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 4px;"></i></a>
                    <div class="dropdown-content">
                        <a href="reportfoundfinal.html"><i class="fa-solid fa-box-open" style="margin-right: 8px; color: #10b981;"></i> Report Found Item</a>
                        <a href="reportlostfinal.html"><i class="fa-solid fa-magnifying-glass" style="margin-right: 8px; color: #e11d48;"></i> Report Lost Item</a>
                    </div>
                </div>

                <a href="#" id="nav-browse">BROWSE</a>
                <a href="#" id="nav-claim">CLAIM REQUEST</a>
            </nav>

            <div>
                <a href="home.html" class="dashboard-logout-btn">Logout</a>  
            </div>
        </header>
    `;

    // Ilalagay niya ito awtomatiko sa element na may id na 'navbar-container'
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navbarHTML;
    }
});