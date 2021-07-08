const menus = [
    {
        title: 'Home',
        icon: 'fas fa-home',
        href: "/dashboard",
        children: false
    },
    {
        title: 'Users',
        icon: 'fas fa-users',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/users"
            },
            {
                title: 'Add Teacher',
                icon: 'fas fa-plus',
                href: "/users/addTeacher"
            },
            {
                title: 'Add Student',
                icon: 'fas fa-plus',
                href: "/users/addTeacher"
            },
            {
                title: 'Add Parent',
                icon: 'fas fa-plus',
                href: "/users/addTeacher"
            }
        ]
    },
    {
        title: 'Exams',
        icon: 'fas fa-book-open',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/exams"
            },
            {
                title: 'Add Exam',
                icon: 'fas fa-plus',
                href: "/exams/new"
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