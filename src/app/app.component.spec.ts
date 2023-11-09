import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BudgetTrackerComponent } from './components/budget-tracker/budget-tracker.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, BudgetTrackerComponent],
            imports: [FormsModule]
        });

        fixture = TestBed.createComponent(AppComponent);
    });

    describe('boundary', () => {
        it('should create the component', () => {
            const appComponent = fixture.componentInstance;
            expect(appComponent).toBeTruthy();
        });

        it('should display the Money Manager title', () => {
            const titleElement = fixture.nativeElement.querySelector('h2');
            expect(titleElement.textContent).toContain('Money manager');
        });

        it('should contain the BudgetTrackerComponent', () => {
            const budgetTrackerComponent = fixture.nativeElement.querySelector('app-budget-tracker');
            expect(budgetTrackerComponent).toBeTruthy();
        });
    });
});
