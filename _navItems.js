const menus = {
    principal: [
        {
            title: 'Home',
            icon: 'fas fa-home',
            href: "/dashboard",
            children: false
        },
        {

            title: 'Profile',
            icon: 'fas fa-user',
            href: "#",
            children: [
                {
                    title: 'View Profile',
                    icon: 'fas fa-list',
                    href: "/users/profile"
                },
                {
                    title: 'Edit Profile',
                    icon: 'fas fa-edit',
                    href: "/users/profile/edit"
                },

            ]
        },
        {
            title: 'Users',
            icon: 'fas fa-users',
            href: "#",
            children: [
                {
                    title: 'View Principal',
                    icon: 'fas fa-user',
                    href: "/users/viewPrincipal"
                },
                {
                    title: 'View Teachers',
                    icon: 'fas fa-user',
                    href: "/users/viewTeacher"
                },
                {
                    title: 'View Students',
                    icon: 'fas fa-user',
                    href: "/users/viewStudent"
                },
                {
                    title: 'View Parents',
                    icon: 'fas fa-user',
                    href: "/users/viewParent"
                },
                {
                    title: 'Manage',
                    icon: 'fas fa-user-cog',
                    href: "/users/manage"
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

            title: 'Notices',
            icon: 'fas fa-book',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/notices"
                },
                {
                    title: 'Manage',
                    icon: 'fas fa-cogs',
                    href: "/notices/1"
                },
                {
                    title: 'Add Notice',
                    icon: 'fas fa-plus',
                    href: "/notices/new"
                },

            ]
        },
        {
            title: 'Comments',
            icon: 'fas fa-comments',
            href: "#",
            children: [
                {
                    title: 'Comments',
                    icon: 'fas fa-list',
                    href: "/comments/1"
                },

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
                    title: 'Dates',
                    icon: 'fas fa-calendar-alt',
                    href: "/exams"
                },
                {
                    title: 'Manage',
                    icon: 'fas fa-cogs',
                    href: "/exams/manage"
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
        {
            title: 'Reports',
            icon: 'fas fa-clipboard',
            href: "#",
            children: [
                {
                    title: 'Attendances',
                    icon: 'fas fa-calendar-alt',
                    href: "/reports/attendances"
                },
                {
                    title: 'Class Results',
                    icon: 'fas fa-list',
                    href: "/reports/classResults"
                },
                {
                    title: 'Exam Results',
                    icon: 'fas fa-poll',
                    href: "/reports/results"
                },
                {
                    title: 'Students',
                    icon: 'fas fa-users',
                    href: "/reports/students"
                },
            ]
        },
        {
            title: 'Children',
            icon: 'fas fa-child',
            href: "#",
            children: [
                {
                    title: 'Manage',
                    icon: 'fas fa-plus',
                    href: "/children/manage"
                },
            ]
        },
        {
            title: 'Extracurricular Activity',
            icon: 'fas fa-tasks',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/activities/view/activity"
                },
                {
                    title: 'Add Extracurricular Activity',
                    icon: 'fas fa-plus',
                    href: "/activities/new/activity"
                },

            ]
        },
        {
            title: 'Punishments',
            icon: 'fas fa-tasks',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/activities/view/punishment"
                },
                {
                    title: 'Add Punishment',
                    icon: 'fas fa-plus',
                    href: "/activities/new/punishment"
                },

            ]
        },
    ],
    teacher: [
        {
            title: 'Home',
            icon: 'fas fa-home',
            href: "/dashboard",
            children: false
        },
        {

            title: 'Profile',
            icon: 'fas fa-user',
            href: "#",
            children: [
                {
                    title: 'View Profile',
                    icon: 'fas fa-list',
                    href: "/users/profile"
                },
                {
                    title: 'Edit Profile',
                    icon: 'fas fa-edit',
                    href: "/users/profile/edit"
                },

            ]
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
                    title: 'Manage',
                    icon: 'fas fa-user-cog',
                    href: "/users/manage"
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

            title: 'Notices',
            icon: 'fas fa-book',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/notices"
                },
                {
                    title: 'Manage',
                    icon: 'fas fa-cogs',
                    href: "/notices/1"
                },
                {
                    title: 'Add Notice',
                    icon: 'fas fa-plus',
                    href: "/notices/new"
                },

            ]
        },
        {
            title: 'Comments',
            icon: 'fas fa-comments',
            href: "#",
            children: [
                {
                    title: 'Comments',
                    icon: 'fas fa-list',
                    href: "/comments/1"
                },

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
                    title: 'Dates',
                    icon: 'fas fa-calendar-alt',
                    href: "/exams"
                },
                {
                    title: 'Manage',
                    icon: 'fas fa-cogs',
                    href: "/exams/manage"
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
        {
            title: 'Reports',
            icon: 'fas fa-clipboard',
            href: "#",
            children: [
                {
                    title: 'Attendances',
                    icon: 'fas fa-calendar-alt',
                    href: "/reports/attendances"
                },
                {
                    title: 'Class Results',
                    icon: 'fas fa-list',
                    href: "/reports/classResults"
                },
                {
                    title: 'Exam Results',
                    icon: 'fas fa-poll',
                    href: "/reports/results"
                },

            ]
        },
        {
            title: 'Children',
            icon: 'fas fa-child',
            href: "#",
            children: [
                {
                    title: 'Add Children',
                    icon: 'fas fa-plus',
                    href: "/children/new"
                },

            ]
        },
        {
            title: 'Extracurricular Activity',
            icon: 'fas fa-tasks',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/activities/view"
                },
                {
                    title: 'Add Extracurricular Activity',
                    icon: 'fas fa-plus',
                    href: "/activities/new"
                },

            ]
        },
    ],
    student: [
        {
            title: 'Home',
            icon: 'fas fa-home',
            href: "/dashboard",
            children: false
        },
        {

            title: 'Profile',
            icon: 'fas fa-user',
            href: "#",
            children: [
                {
                    title: 'View Profile',
                    icon: 'fas fa-list',
                    href: "/users/profile"
                },
                {
                    title: 'Edit Profile',
                    icon: 'fas fa-edit',
                    href: "/users/profile/edit"
                },

            ]
        },
        {

            title: 'Notices',
            icon: 'fas fa-book',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/notices"
                }

            ]
        },
        {
            title: 'Comments',
            icon: 'fas fa-comments',
            href: "#",
            children: [
                {
                    title: 'Comments',
                    icon: 'fas fa-list',
                    href: "/comments/1"
                },
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
            ]
        },
        {
            title: 'Exams',
            icon: 'fas fa-book-open',
            href: "#",
            children: [
                {
                    title: 'Dates',
                    icon: 'fas fa-calendar-alt',
                    href: "/exams"
                },
                {
                    title: 'Results',
                    icon: 'fas fa-poll',
                    href: "/exams/results"
                },
            ]
        },
        {
            title: 'Extracurricular Activity',
            icon: 'fas fa-tasks',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/activities/viewStudent"
                },

            ]
        },
    ],
    parent: [
        {
            title: 'Home',
            icon: 'fas fa-home',
            href: "/dashboard",
            children: false
        },
        {

            title: 'Profile',
            icon: 'fas fa-user',
            href: "#",
            children: [
                {
                    title: 'View Profile',
                    icon: 'fas fa-list',
                    href: "/users/profile"
                },
                {
                    title: 'Edit Profile',
                    icon: 'fas fa-edit',
                    href: "/users/profile/edit"
                },

            ]
        },
        {

            title: 'Notices',
            icon: 'fas fa-book',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/notices"
                }

            ]
        },
        {
            title: 'Comments',
            icon: 'fas fa-comments',
            href: "#",
            children: [
                {
                    title: 'Comments',
                    icon: 'fas fa-list',
                    href: "/comments/1"
                },
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
            ]
        },
        {
            title: 'Exams',
            icon: 'fas fa-book-open',
            href: "#",
            children: [
                {
                    title: 'Dates',
                    icon: 'fas fa-calendar-alt',
                    href: "/exams"
                },
                {
                    title: 'Results',
                    icon: 'fas fa-poll',
                    href: "/exams/results"
                },
            ]
        },
        {
            title: 'Children',
            icon: 'fas fa-child',
            href: "#",
            children: [
                {
                    title: 'List',
                    icon: 'fas fa-list',
                    href: "/children"
                },
            ]
        },
    ],
};

module.exports = menus;