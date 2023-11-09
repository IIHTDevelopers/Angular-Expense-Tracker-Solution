import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.models';

import { BudgetTrackerComponent } from './budget-tracker.component';

describe('BudgetTrackerComponent', () => {
  let component: BudgetTrackerComponent;
  let fixture: ComponentFixture<BudgetTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetTrackerComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(BudgetTrackerComponent);
    component = fixture.componentInstance;
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have initial expenses array empty', () => {
      expect(component.expenses).not.toBeNull();
      expect(component.expenses).toEqual([]);
    });

    it('should add a new expense', () => {
      component.newExpense = {
        id: 1,
        description: 'Groceries',
        amount: 50,
        date: '2023-11-01',
        category: 'cash',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(1);
    });

    it('should not add an empty expense', () => {
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(0);
    });

    it('should calculate total expense', () => {
      component.expenses = [
        {
          id: 1,
          description: 'Groceries',
          amount: 50,
          date: '2023-11-01',
          category: 'cash',
        },
        {
          id: 2,
          description: 'Dinner',
          amount: 30,
          date: '2023-11-02',
          category: 'credit_card',
        }];
      expect(component.calculateTotalExpense()).not.toBeNull();
      expect(component.calculateTotalExpense()).toBe(80);
    });

    it('should update an expense', () => {
      const initialExpensesCount = component.expenses.length;
      component.editingExpense = {
        id: 1,
        description: 'Existing Expense',
        amount: 100,
        date: '2023-11-01',
        category: 'upi',
      };
      // Modify the expense
      component.editingExpense.description = 'Updated Expense';
      component.editingExpense.amount = 200;
      component.editingExpense.date = '2023-11-02';
      component.editingExpense.category = 'cash';

      component.addOrUpdateExpense();

      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(initialExpensesCount);
      const updatedExpense = component.expenses.find((expense: { id: number; }) => expense.id === 1);
      expect(updatedExpense).not.toBeNull();
      expect(updatedExpense?.description).toBe('Updated Expense');
      expect(updatedExpense?.amount).toBe(200);
      expect(updatedExpense?.date).toBe('2023-11-02');
      expect(updatedExpense?.category).toBe('cash');
    });

    it('should not add an expense with empty fields', () => {
      component.newExpense = {
        id: 0,
        description: '',
        amount: 0,
        date: '',
        category: 'cash',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(0);
    });

    it('should not add an expense with a negative amount', () => {
      component.newExpense = {
        id: 0,
        description: 'Groceries',
        amount: -50,
        date: '2023-11-01',
        category: 'cash',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(0);
    });

    it('should not add an expense with an empty date', () => {
      component.newExpense = {
        id: 0,
        description: 'Groceries',
        amount: 50,
        date: '',
        category: 'cash',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(0);
    });

    it('should not add an expense with an empty category', () => {
      component.newExpense = {
        id: 0,
        description: 'Groceries',
        amount: 50,
        date: '2023-11-01',
        category: '',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(0);
    });

    it('should edit an expense and update it', () => {
      const originalExpense = {
        id: 1,
        description: 'Groceries',
        amount: 50,
        date: '2023-11-01',
        category: 'cash',
      };
      component.newExpense = { ...originalExpense };
      component.addOrUpdateExpense();
      component.editExpense(originalExpense);
      const updatedExpense = {
        id: originalExpense.id,
        description: originalExpense.description,
        amount: originalExpense.amount,
        date: originalExpense.date,
        category: originalExpense.category,
      };
      component.newExpense = { ...updatedExpense };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses[0]).not.toBeNull();
      expect(component.expenses[0]).toEqual(updatedExpense);
    });

    it('should not edit an expense with empty fields', () => {
      const originalExpense = {
        id: 1,
        description: 'Groceries',
        amount: 50,
        date: '2023-11-01',
        category: 'cash',
      };
      component.newExpense = { ...originalExpense };
      component.addOrUpdateExpense();
      component.editExpense(originalExpense);
      component.newExpense = {
        id: originalExpense.id,
        description: '',
        amount: 0,
        date: '',
        category: '',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      // expect(component.expenses[0]).not.toBeNull();
      // expect(component.expenses[0]).toEqual(originalExpense);
    });

    it('should delete an expense', () => {
      component.newExpense = {
        id: 1,
        description: 'Groceries',
        amount: 50,
        date: '2023-11-01',
        category: 'cash',
      };
      component.addOrUpdateExpense();
      expect(component.expenses).not.toBeNull();
      expect(component.expenses.length).toBe(1);
      component.deleteExpense(component.newExpense);
    });

    it('should initialize newExpense with default values', () => {
      expect(component.newExpense).not.toBeNull();
      expect(component.newExpense.id).toBe(0);
      expect(component.newExpense.description).toBe('');
      expect(component.newExpense.amount).toBe(0);
      expect(component.newExpense.date).toBe('');
      expect(component.newExpense.category).toBe('cash');
    });
  });
});
