import { __awaiter, __decorate } from "tslib";
import { Component, Input, ViewChild } from "@angular/core";
import { sleep, waitTill } from "@co.mmons/js-utils/core";
import { IonInput, ModalController, PopoverController } from "@ionic/angular";
import { LinkModal } from "./link-modal";
let InsertMenu = class InsertMenu {
    // @ts-ignore
    constructor(popoverController, modalController) {
        this.popoverController = popoverController;
        this.modalController = modalController;
    }
    insertLink() {
        return __awaiter(this, void 0, void 0, function* () {
            this.popoverController.dismiss(undefined, "link");
            LinkModal.present(this.modalController, this.editor);
        });
    }
    insertYoutube() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inputView = "youtube";
            yield waitTill(() => !!this.youtubeInput, undefined, 2000);
            this.youtubeInput.setFocus();
        });
    }
    // @ts-ignore
    parseYoutube(value) {
        // https://www.youtube.com/watch?v=NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc
        // https://www.youtube.com/embed/NqMgaHUNSQc
        // https://www.youtube-nocookie.com/embed/NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc?t=17
        value = value.replace("-nocookie.com/", ".com/");
        value = value.replace("/embed/", "/");
        value = value.replace("youtu.be/", "youtube.com/");
        value = value.replace("watch?v=", "");
        value = value.replace("?", "&");
        const info = { id: undefined, start: undefined };
        if (value.indexOf("youtube.com/") > -1) {
            value = value.split("youtube.com/").splice(1, 1)[0];
            for (const param of value.split("&")) {
                if (param.indexOf("=") < 0) {
                    info.id = param;
                }
                else if (param.startsWith("t=")) {
                    info.start = param.substring(2);
                }
                else if (param.startsWith("start=")) {
                    info.start = param.substring(6);
                }
            }
        }
        else {
        }
        if (info.id) {
            return info;
        }
    }
    applyYoutube() {
        const info = this.parseYoutube(this.youtubeInput.value);
        if (info) {
            const tr = this.editor.state.tr.replaceSelectionWith(this.editor.state.schema.nodes.youtube.create({ id: info.id, start: info.start || 0 }));
            this.editor.view.dispatch(tr);
        }
        this.popoverController.dismiss(undefined, "youtube");
    }
    cancel() {
        this.popoverController.dismiss();
    }
    ngOnInit() {
    }
    ionViewWillLeave(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inputView && !event.role) {
                this.editor.focus();
            }
        });
    }
    ionViewDidLeave(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.inputView) {
                yield sleep(50);
                this.editor.focus();
            }
            else if (!event.role) {
                this.editor.focus();
            }
        });
    }
};
InsertMenu.ctorParameters = () => [
    { type: PopoverController },
    { type: ModalController }
];
__decorate([
    Input()
], InsertMenu.prototype, "editor", void 0);
__decorate([
    ViewChild("youtubeInput", { static: false })
], InsertMenu.prototype, "youtubeInput", void 0);
InsertMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">
            
            <ng-template [ngIf]="!inputView">
                
                <ion-item button="true" detail="false" (click)="insertLink()">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</ion-label>
                    <ion-icon name="link" slot="start"></ion-icon>
                </ion-item>
    
                <ion-item button="true" detail="false" (click)="insertYoutube()">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#youtube/YouTube video" | intlMessage}}</ion-label>
                    <ion-icon name="logo-youtube" slot="start"></ion-icon>
                </ion-item>
                
            </ng-template>
            
            <ng-template [ngIf]="inputView == 'youtube'">

                <ion-item>
                    <ion-icon name="logo-youtube" slot="start"></ion-icon>
                    <ion-input #youtubeInput [placeholder]="'@co.mmons/ionic-extensions/html-editor#youtube/Paste YouTube video url' | intlMessage" (keydown.enter)="applyYoutube()"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ionx-buttons slot="end">
                        <ion-button fill="clear" color="dark" (click)="cancel()">
                            <ion-label>{{"@co.mmons/js-intl#Cancel" | intlMessage}}</ion-label>
                        </ion-button>
                        
                        <ion-button fill="clear" color="primary" (click)="applyYoutube()">
                            <ion-label>{{"@co.mmons/js-intl#Ok" | intlMessage}}</ion-label>
                        </ion-button>
                    </ionx-buttons>
                </ion-item>
    
            </ng-template>
            
        </ion-list>
    `,
        styles: [`:host ion-list { margin: 0px; padding: 0px }`,
            `:host ion-item:last-child { --border-width: 0px; }`,
            `:host ion-item { --highlight-height: 0px; }`]
    })
], InsertMenu);
export { InsertMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImluc2VydC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzVFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFpRHZDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFFbkIsYUFBYTtJQUNiLFlBQW9CLGlCQUFvQyxFQUFVLGVBQWdDO1FBQTlFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDbEcsQ0FBQztJQVdLLFVBQVU7O1lBRVosSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQUE7SUFLSyxhQUFhOztZQUVmLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVELGFBQWE7SUFDTCxZQUFZLENBQUMsS0FBYTtRQUM5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QyxLQUE4Qjs7WUFFaEQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUV2QjtpQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QjtRQUNMLENBQUM7S0FBQTtDQUNKLENBQUE7O1lBeEcwQyxpQkFBaUI7WUFBMkIsZUFBZTs7QUFJbEc7SUFEQyxLQUFLLEVBQUU7MENBQ21CO0FBZ0IzQjtJQURDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7Z0RBQ1o7QUF2QnRCLFVBQVU7SUEvQ3RCLFNBQVMsQ0FBQztRQU1QLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUNUO2lCQTNDRyw4Q0FBOEM7WUFDOUMsb0RBQW9EO1lBQ3BELDZDQUE2QztLQTBDcEQsQ0FBQztHQUNXLFVBQVUsQ0EyR3RCO1NBM0dZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtzbGVlcCwgd2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtJb25JbnB1dCwgTW9kYWxDb250cm9sbGVyLCBQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge092ZXJsYXlFdmVudERldGFpbH0gZnJvbSBcIkBpb25pYy9jb3JlXCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtMaW5rTW9kYWx9IGZyb20gXCIuL2xpbmstbW9kYWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24tbGlzdCB7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHggfWAsXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpsYXN0LWNoaWxkIHsgLS1ib3JkZXItd2lkdGg6IDBweDsgfWAsXG4gICAgICAgIGA6aG9zdCBpb24taXRlbSB7IC0taGlnaGxpZ2h0LWhlaWdodDogMHB4OyB9YFxuICAgIF0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWlucHV0Vmlld1wiPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwiaW5zZXJ0TGluaygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpbmsvTGlua1wiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImxpbmtcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgXG4gICAgICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJpbnNlcnRZb3V0dWJlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjeW91dHViZS9Zb3VUdWJlIHZpZGVvXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwibG9nby15b3V0dWJlXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlucHV0VmlldyA9PSAneW91dHViZSdcIj5cblxuICAgICAgICAgICAgICAgIDxpb24taXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJsb2dvLXlvdXR1YmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWlucHV0ICN5b3V0dWJlSW5wdXQgW3BsYWNlaG9sZGVyXT1cIidAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciN5b3V0dWJlL1Bhc3RlIFlvdVR1YmUgdmlkZW8gdXJsJyB8IGludGxNZXNzYWdlXCIgKGtleWRvd24uZW50ZXIpPVwiYXBwbHlZb3V0dWJlKClcIj48L2lvbi1pbnB1dD5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxpb24taXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPGlvbngtYnV0dG9ucyBzbG90PVwiZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiBjb2xvcj1cImRhcmtcIiAoY2xpY2spPVwiY2FuY2VsKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvanMtaW50bCNDYW5jZWxcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImFwcGx5WW91dHViZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2pzLWludGwjT2tcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9pb254LWJ1dHRvbnM+XG4gICAgICAgICAgICAgICAgPC9pb24taXRlbT5cbiAgICBcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9pb24tbGlzdD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEluc2VydE1lbnUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyLCBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVkaXRvcjogSHRtbEVkaXRvcjtcblxuICAgIGlucHV0VmlldzogXCJ5b3V0dWJlXCI7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBlZGl0b3JMYXN0U2VsZWN0aW9uOiBbbnVtYmVyLCBudW1iZXJdO1xuXG5cbiAgICBhc3luYyBpbnNlcnRMaW5rKCkge1xuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcyh1bmRlZmluZWQsIFwibGlua1wiKTtcblxuICAgICAgICBMaW5rTW9kYWwucHJlc2VudCh0aGlzLm1vZGFsQ29udHJvbGxlciwgdGhpcy5lZGl0b3IpO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoXCJ5b3V0dWJlSW5wdXRcIiwge3N0YXRpYzogZmFsc2V9KVxuICAgIHByaXZhdGUgeW91dHViZUlucHV0OiBJb25JbnB1dDtcblxuICAgIGFzeW5jIGluc2VydFlvdXR1YmUoKSB7XG5cbiAgICAgICAgdGhpcy5pbnB1dFZpZXcgPSBcInlvdXR1YmVcIjtcblxuICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMueW91dHViZUlucHV0LCB1bmRlZmluZWQsIDIwMDApO1xuICAgICAgICB0aGlzLnlvdXR1YmVJbnB1dC5zZXRGb2N1cygpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIHBhcnNlWW91dHViZSh2YWx1ZTogc3RyaW5nKToge2lkOiBzdHJpbmcsIHN0YXJ0Pzogc3RyaW5nfSB7XG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9TnFNZ2FIVU5TUWNcbiAgICAgICAgLy8gaHR0cHM6Ly95b3V0dS5iZS9OcU1nYUhVTlNRY1xuICAgICAgICAvLyBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9OcU1nYUhVTlNRY1xuICAgICAgICAvLyBodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9OcU1nYUhVTlNRY1xuICAgICAgICAvLyBodHRwczovL3lvdXR1LmJlL05xTWdhSFVOU1FjP3Q9MTdcblxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCItbm9jb29raWUuY29tL1wiLCBcIi5jb20vXCIpO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCIvZW1iZWQvXCIsIFwiL1wiKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwieW91dHUuYmUvXCIsIFwieW91dHViZS5jb20vXCIpO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ3YXRjaD92PVwiLCBcIlwiKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwiP1wiLCBcIiZcIik7XG5cbiAgICAgICAgY29uc3QgaW5mbyA9IHtpZDogdW5kZWZpbmVkLCBzdGFydDogdW5kZWZpbmVkfTtcblxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihcInlvdXR1YmUuY29tL1wiKSA+IC0xKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwieW91dHViZS5jb20vXCIpLnNwbGljZSgxLCAxKVswXTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiB2YWx1ZS5zcGxpdChcIiZcIikpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uaW5kZXhPZihcIj1cIikgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uaWQgPSBwYXJhbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLnN0YXJ0c1dpdGgoXCJ0PVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnN0YXJ0ID0gcGFyYW0uc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0uc3RhcnRzV2l0aChcInN0YXJ0PVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnN0YXJ0ID0gcGFyYW0uc3Vic3RyaW5nKDYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgYXBwbHlZb3V0dWJlKCkge1xuXG5cbiAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMucGFyc2VZb3V0dWJlKHRoaXMueW91dHViZUlucHV0LnZhbHVlIGFzIHN0cmluZyk7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyLnJlcGxhY2VTZWxlY3Rpb25XaXRoKHRoaXMuZWRpdG9yLnN0YXRlLnNjaGVtYS5ub2Rlcy55b3V0dWJlLmNyZWF0ZSh7aWQ6IGluZm8uaWQsIHN0YXJ0OiBpbmZvLnN0YXJ0IHx8IDB9KSk7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcyh1bmRlZmluZWQsIFwieW91dHViZVwiKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoZXZlbnQ6IE92ZXJsYXlFdmVudERldGFpbDxhbnk+KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0VmlldyAmJiAhZXZlbnQucm9sZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRMZWF2ZShldmVudDogT3ZlcmxheUV2ZW50RGV0YWlsPGFueT4pIHtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXcpIHtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKDUwKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICghZXZlbnQucm9sZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==