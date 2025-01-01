// dashboard/add-survey-popup/add-survey-popup.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-survey-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Overlay with improved backdrop blur -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn">
      <!-- Popup Container with responsive width -->
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-auto animate-slideIn">
        <!-- Header with improved spacing -->
        <div class="px-6 py-4 sm:py-5 border-b flex items-center justify-between">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Create New Survey</h2>
          <button (click)="onClose.emit()"
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 -mr-2">
            <span class="material-icons text-gray-500">close</span>
          </button>
        </div>

        <!-- Form Content with better spacing and responsive padding -->
        <div class="p-6 sm:p-8 space-y-6">
          <!-- Title Input with floating label -->
          <div class="relative">
            <input type="text"
                   id="title"
                   class="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:border-[#047956] focus:ring-2 focus:ring-[#047956]/20 transition-all duration-200"
                   placeholder="Survey Title">
            <label for="title"
                   class="absolute left-2 -top-2.5 bg-white px-2 text-sm font-medium text-gray-700 transition-all
                          peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                          peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm">
              Survey Title
            </label>
          </div>

          <!-- Description Input with floating label -->
          <div class="relative">
            <textarea id="description"
                     rows="4"
                     class="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:border-[#047956] focus:ring-2 focus:ring-[#047956]/20 transition-all duration-200"
                     placeholder="Description"></textarea>
            <label for="description"
                   class="absolute left-2 -top-2.5 bg-white px-2 text-sm font-medium text-gray-700 transition-all
                          peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                          peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm">
              Description
            </label>
          </div>

          <!-- Category Input with improved select styling -->
          <div class="relative">
            <select id="category"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#047956] focus:ring-2 focus:ring-[#047956]/20 transition-all duration-200 bg-white appearance-none">
              <option value="" disabled selected>Select a category</option>
              <option value="general">General Survey</option>
              <option value="education">Education</option>
              <option value="health">Healthcare</option>
              <option value="business">Business</option>
            </select>
            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <span class="material-icons text-gray-500">expand_more</span>
            </div>
          </div>
        </div>

        <!-- Footer with improved button styling -->
        <div class="px-6 sm:px-8 py-4 sm:py-5 border-t bg-gray-50 rounded-b-xl flex flex-col sm:flex-row items-center justify-end gap-3">
          <button (click)="onClose.emit()"
                  class="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            Cancel
          </button>
          <button class="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#047956] hover:bg-[#047956]/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            Create Survey
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-slideIn {
      animation: slideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-24px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class AddSurveyPopupComponent {
  @Output() onClose = new EventEmitter<void>();
}