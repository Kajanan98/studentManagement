const menus = [
    {
        title: 'Vehicles',
        icon: 'fas fa-tractor',
        href: "#",
        children: [
            {
                title: 'Vehicle Brands',
                icon: 'fas fa-align-left',
                href: "/fleet-management/brands"
            },
            {
                title: 'Vehicles',
                icon: 'fas fa-tractor',
                href: "/fleet-management/vehicles"
            },
            {
                title: 'Add Vehicles',
                icon: 'fas fa-plus',
                href: "/fleet-management/vehicles/new"
            }
        ]
    },
    {
        title: 'Supplies',
        icon: 'fas fa-truck-loading',
        href: "#",
        children: [
            {
                title: 'View',
                icon: 'fas fa-eye',
                href: "/fleet-management/supplies"
            },
            {
                title: 'New Supply',
                icon: 'fas fa-plus',
                href: "/fleet-management/supplies/new"
            }
        ]
    },
    {
        title: 'Requests',
        icon: 'fas fa-file-signature',
        href: "/fleet-management/requests",
        children: false
    },
    {
        title: 'Fleet Requests',
        icon: 'fas fa-envelope-open-text',
        href: "#",
        children: [
            {
                title: 'View',
                icon: 'fas fa-eye',
                href: "/fleet-management/supplies/req"
            },
            {
                title: 'Request',
                icon: 'fas fa-plus',
                href: "/fleet-management/supplies/new/req"
            }
        ]
    }
];

module.exports = menus;