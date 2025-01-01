import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent {
  isExpanded = false;
  
  navItems: NavItem[] = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/statistics', icon: 'analytics', label: 'Statistics' },
    { path: '/global-results', icon: 'public', label: 'Global Results' },
    { path: '/manage-surveys', icon: 'edit_note', label: 'Manage Surveys' },
  ];
}