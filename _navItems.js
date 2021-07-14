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
                href: "/users/addStudent"
            },
            {
                title: 'Add Parent',
                icon: 'fas fa-plus',
                href: "/users/addParent"
            }
        ]
    },
    {
        title: 'Classes',
        icon: 'fas fa-chalkboard-teacher',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/classes"
            },
            {
                title: 'TimeTable',
                icon: 'fas fa-calendar-alt',
                href: "/classes/timetable"
            },
            {
                title: 'Add Class',
                icon: 'fas fa-plus',
                href: "/classes/new"
            }
        ]
    },
    {
        title: 'TimeTables',
        icon: 'fas fa-calendar-alt',
        href: "#",
        children: [
            {
                title: 'View',
                icon: 'fas fa-calendar-alt',
                href: "/timetables"
            },
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/timetables/list"
            },
            {
                title: 'Add Timetable',
                icon: 'fas fa-plus',
                href: "/timetables/new"
            },
        ]
    },
    {
        title: 'Attendance',
        icon: 'fas fa-clipboard',
        href: "#",
        children: [
            {
                title: 'View',
                icon: 'fas fa-list',
                href: "/attendance"
            },
            {
                title: 'History',
                icon: 'fas fa-calendar-alt',
                href: "/attendance/history"
            },
            {
                title: 'Take attendance',
                icon: 'fas fa-calendar-alt',
                href: "/attendance/add"
            },
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
            },
            {
                title: 'Results',
                icon: 'fas fa-poll',
                href: "/exams/results"
            },
            {
                title: 'Result List',
                icon: 'fas fa-list',
                href: "/exams/resultsList"
            },
            {
                title: 'Add Result',
                icon: 'fas fa-plus',
                href: "/exams/addResult"
            },
        ]
    },
];

module.exports = menus;