document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Sidebar toggle
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        });

        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });

        const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function () {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('open');
            });
        });
    }

    // Desktop dropdown hover
    const desktopDropdown = document.querySelector('.nav-item.dropdown');
    const desktopMenu = document.querySelector('.dropdown-menu');

    if (desktopDropdown && desktopMenu) {
        desktopDropdown.addEventListener('mouseenter', function () {
            desktopMenu.style.display = 'block';
        });

        desktopDropdown.addEventListener('mouseleave', function () {
            desktopMenu.style.display = 'none';
        });
    }
});