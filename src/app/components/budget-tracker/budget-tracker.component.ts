import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Expense } from '../../models/expense.models';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.css']
})
export class BudgetTrackerComponent {
  expenses: Expense[] = [];
  newExpense: Expense = { id: 0, description: '', amount: 0, date: '', category: 'cash' };
  editingExpense: Expense | null = null;

  // constructor(private cdr: ChangeDetectorRef) {
  //   this.newExpense = { id: 0, description: '', amount: 0, date: '', category: 'cash' };
  // }

  addOrUpdateExpense() {
    if (this.editingExpense) {
      this.updateExpense();
    } else {
      this.addExpense();
    }
  }

  editExpense(expense: Expense) {
    this.editingExpense = { ...expense };
    this.cdr.detectChanges();
  }

  updateExpense() {
    if (this.editingExpense) {
      const index = this.expenses.findIndex((expense) => expense.id === this.editingExpense!.id);
      if (index !== -1) {
        this.expenses[index] = { ...this.editingExpense };
        this.editingExpense = null;
      }
    }
  }

  cancelEdit() {
    this.editingExpense = null;
  }

  addExpense() {
    if (this.newExpense.description && this.newExpense.amount > 0 && this.newExpense.date && this.newExpense.category) {
      this.newExpense.id = this.generateUniqueId();
      this.expenses.push({ ...this.newExpense });
      this.newExpense = { id: 0, description: '', amount: 0, date: '', category: 'cash' };
    }
  }

  deleteExpense(expense: Expense) {
    this.expenses = this.expenses.filter((e) => e.id !== expense.id);
    this.editingExpense = null;
  }

  calculateTotalExpense(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  generateUniqueId(): number {
    return this.expenses.length + 1;
  }
}
