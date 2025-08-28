"use client";

import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  LogOut,
  Layers,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function RegistrarLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Initial check: if large screen (≥ 1024px), open sidebar
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    // Update when resizing
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigation = [
    { name: "Dashboard", href: "/registrar/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/registrar/applications", icon: FileText },
    { name: "Students", href: "/registrar/students", icon: Users },
    { name: "Departments", href: "/registrar/departments", icon: Layers },
    { name: "Courses", href: "/registrar/courses", icon: BookOpen },
    {
      name: "Assessments",
      href: "/registrar/assessments",
      icon: ClipboardList,
    },
    { name: "Batches", href: "/registrar/batches", icon: Calendar },
    { name: "Teachers", href: "/registrar/teachers", icon: Calendar },
    { name: "Customize Tables", href: "/registrar/tables", icon: Calendar },
  ];

  return (
    <div className=" flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out `}
      >
        <div className="flex items-center   justify-between h-16 px-4 bg-blue-600">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/companylogo.jpg"
              className="h-12 text-white rounded-full"
            />
            {/* <GraduationCap className="h-8 w-8 text-white" /> */}
            <div className="text-white">
              <div className="text-sm font-bold">DHFM COLLEGE</div>
              <div className="text-xs opacity-75">Registrar Portal</div>
            </div>
          </div>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setSidebarOpen(false);
            }}
            fill="white"
          >
            <title>collapse-horizontal-solid</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="invisible_box" data-name="invisible box">
                <rect width="48" height="48" fill="none" />
              </g>
              <g id="icons_Q2" data-name="icons Q2">
                <g>
                  <path d="M32.6,22.6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L38.8,26H44a2,2,0,0,0,0-4H38.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2Z" />
                  <path d="M15.4,25.4a1.9,1.9,0,0,0,0-2.8l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L9.2,22H4a2,2,0,0,0,0,4H9.2L6.6,28.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2Z" />
                  <path d="M26,6V42a2,2,0,0,0,4,0V6a2,2,0,0,0-4,0Z" />
                  <path d="M22,42V6a2,2,0,0,0-4,0V42a2,2,0,0,0,4,0Z" />
                </g>
              </g>
            </g>
          </svg>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname.includes(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    window.innerWidth <= 1024 && setSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="absolute bottom-20 w-full p-4">
          <Button
            onClick={() => {
              setSidebarOpen(false);
              console.log(sidebarOpen);
            }}
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-300"
          >
            collapse
          </Button>
        </div>
        <div className="absolute bottom-0 w-full p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-300"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      {/* <div className={`inset-0 w-full ${sidebarOpen ? "ml-64 " : "ml-0"}`}> */}
      <div
        className={`inset-0 w-full transition-all duration-300 ${
          sidebarOpen && window.innerWidth >= 1024 ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={() => setSidebarOpen(true)}
          >
            {!sidebarOpen && <Menu className="h-6 w-6" />}{" "}
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Registrar Portal
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">RG</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Registrar
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Academic Records
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
          <div className="mx-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// import { Outlet, Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
// import {
//   GraduationCap,
//   LayoutDashboard,
//   FileText,
//   Users,
//   BookOpen,
//   ClipboardList,
//   Calendar,
//   LogOut,
//   Menu,
// } from "lucide-react";
// import { useState } from "react";

// export default function RegistrarLayout() {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navigation = [
//     { name: "Dashboard", href: "/registrar/dashboard", icon: LayoutDashboard },
//     { name: "Applications", href: "/registrar/applications", icon: FileText },
//     { name: "Students", href: "/registrar/students", icon: Users },
//     { name: "Courses", href: "/registrar/courses", icon: BookOpen },
//     {
//       name: "Assessments",
//       href: "/registrar/assessments",
//       icon: ClipboardList,
//     },
//     { name: "Batches", href: "/registrar/batches", icon: Calendar },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 "
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:transform-none lg:flex lg:flex-col`}
//       >
//         <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
//           <div className="flex items-center space-x-2">
//             <GraduationCap className="h-8 w-8 text-white" />
//             <div className="text-white">
//               <div className="text-sm font-bold">DHFM COLLEGE</div>
//               <div className="text-xs opacity-75">Registrar Portal</div>
//             </div>
//           </div>
//         </div>

//         <nav className="mt-8 flex-1">
//           <div className="px-4 space-y-2">
//             {navigation.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                     isActive
//                       ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
//                       : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="mr-3 h-5 w-5" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>

//         <div className="p-4">
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-gray-600 dark:text-gray-300"
//           >
//             <LogOut className="mr-3 h-5 w-5" />
//             Sign Out
//           </Button>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1">
//         {/* Top bar */}
//         <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8">
//           <Button
//             variant="ghost"
//             size="icon"
//             className=""
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </Button>

//           <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
//             <div className="flex flex-1 items-center">
//               <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Registrar Portal
//               </h1>
//             </div>
//             <div className="flex items-center gap-x-4 lg:gap-x-6">
//               <ThemeToggle />
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">RG</span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <div className="text-sm font-medium text-gray-900 dark:text-white">
//                     Registrar
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     Academic Records
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="py-8">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
