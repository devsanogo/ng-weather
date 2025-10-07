import { DOCUMENT } from "@angular/common";
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    QueryList,
    ViewChildren,
    inject
} from "@angular/core";
import { LocationService } from "app/core/services/locations/location.service";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterViewInit {
    @Input() titles: string[] = [];
    @ViewChildren('tabInputRef') tabInputRef!: QueryList<ElementRef>;
    @ViewChildren('tabLabelRef') tabLabelRef!: QueryList<ElementRef>;
    readonly document = inject(DOCUMENT);
    private readonly locationService = inject(LocationService);

    ngAfterViewInit(): void {
        this.setTabInputChecked(0);
        (<HTMLElement>this.document.querySelectorAll('.tab-content')[0]).style.display = "block";
        this.tabLabelRef.toArray()[0]?.nativeElement.setAttribute('style', 'color: #000; background: #eee');
    }

    selectTab(event: Event, idx: number): void {
        this.initTabContent();
        this.resetLabelStyle(idx);   
        (event.target as HTMLInputElement).setAttribute('checked', '');     
        (this.document.querySelectorAll('.tab-content')[idx] as HTMLElement).style.display = "block";
    }

    removeTab(idx: number): void {
        const locations = JSON.parse(localStorage.getItem('locations') as string);
        const elementToRemove = locations[idx];

        this.tabInputRef.toArray()[idx]?.nativeElement.remove();
        this.tabLabelRef.toArray()[idx]?.nativeElement.remove();
        this.document.querySelectorAll('.tab-content')[idx].remove();
        this.initTabContent();

        if (idx > 0) {
            this.setTabInputChecked(idx - 1);
            this.resetLabelStyle(idx - 1);
            (this.document.querySelectorAll('.tab-content')[idx - 1] as HTMLElement).style.display = "block";
        }

        this.locationService.removeLocation(elementToRemove);
    }

    private initTabContent(): void {
        this.tabInputRef.toArray()?.forEach(inp => inp.nativeElement.removeAttribute('checked'));
        this.document.querySelectorAll('.tab-content')?.forEach((tab: Element) => {
            (tab as HTMLElement).style.display = "none";   
        });
    }

    private resetLabelStyle(idx: number): void {
        this.tabLabelRef.toArray()?.forEach((label) => label.nativeElement.setAttribute('style', 'color: #eee; background: rgb(95, 119, 160)'))
        this.tabLabelRef.toArray()[idx]?.nativeElement.setAttribute('style', 'color: #000; background: #eee');
    }

    private setTabInputChecked(idx: number): void {
        this.tabInputRef.toArray()[idx]?.nativeElement.setAttribute('checked', '');
    }
}