// dashboard/add-survey-popup/add-survey-popup.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-survey-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
      <!-- Popup Container -->
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-slideIn">
        <!-- Header -->
        <div class="p-6 border-b flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">Create New Survey</h2>
          <button (click)="onClose.emit()"
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <span class="material-icons text-gray-500">close</span>
          </button>
        </div>

        <!-- Form Content -->
        <div class="p-6 space-y-6">
          <!-- Title Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Survey Title</label>
            <input type="text"
                   class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#047956] focus:ring-2 focus:ring-[#047956]/20 transition-all duration-200"
                   placeholder="Enter survey title">
          </div>

          <!-- Description Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows="4"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#047956] focus:ring-2 focus:ring-[#047956]/20 transition-all duration-200"
                      placeholder="Enter survey description"></textarea>
          </div>

          <!-- Category Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#047956] focus:ring-2 focus:ring-[#047956]/20 transition-all duration-200 bg-white">
              <option value="" disabled selected>Select a category</option>
              <option value="general">General Survey</option>
              <option value="education">Education</option>
              <option value="health">Healthcare</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t bg-gray-50 rounded-b-xl flex items-center justify-end gap-3">
          <button (click)="onClose.emit()"
                  class="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            Cancel
          </button>
          <button class="px-5 py-2.5 text-sm font-medium text-white bg-[#047956] hover:bg-[#047956]/90 rounded-lg shadow-sm hover:shadow transition-all duration-200">
            Create Survey
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out;
    }

    .animate-slideIn {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class AddSurveyPopupComponent {
  @Output() onClose = new EventEmitter<void>();
}
