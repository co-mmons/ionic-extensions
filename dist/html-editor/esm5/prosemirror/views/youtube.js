import { removeSelectedNode } from "prosemirror-utils";
export function createYoutubeIframe(id, start) {
    var iframe = document.createElement("iframe");
    iframe.height = "200px";
    iframe.width = "100%";
    iframe.src = "https://www.youtube.com/embed/" + id + (start ? "?start=" + start : "");
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    return iframe;
}
// https://www.youtube.com/watch?v=m3V7_Ov52sY
var YoutubeNodeView = /** @class */ (function () {
    function YoutubeNodeView(node, view, eventManager) {
        var _this = this;
        this.view = view;
        this.dom = document.createElement("div");
        this.dom.style.position = "relative";
        this.dom.style.overflow = "hidden";
        this.dom.style.height = "200px";
        this.dom.style.marginTop = "16px";
        this.dom.setAttribute("no-blur", "");
        this.dom.appendChild(createYoutubeIframe(node.attrs.id, node.attrs.start));
        var overlay = this.dom.appendChild(document.createElement("div"));
        overlay.style.position = "absolute";
        overlay.style.left = "0px";
        overlay.style.top = "0px";
        overlay.style.width = "100%";
        overlay.style.height = "200px";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        var button = overlay.appendChild(document.createElement("ion-button"));
        button.classList.add("ionx--interactive");
        button.setAttribute("color", "primary");
        this.deleteUnlisten = eventManager.addEventListener(button, "click", function () { return _this.deleteNode(); });
        var icon = document.createElement("ion-icon");
        icon.setAttribute("name", "trash");
        icon.slot = "icon-only";
        button.appendChild(icon);
    }
    YoutubeNodeView.prototype.deleteNode = function () {
        this.view.dispatch(removeSelectedNode(this.view.state.tr));
    };
    YoutubeNodeView.prototype.selectNode = function () {
        this.dom.classList.add("ionx--selected");
    };
    YoutubeNodeView.prototype.deselectNode = function () {
        this.dom.classList.remove("ionx--selected");
    };
    YoutubeNodeView.prototype.update = function (node) {
        return false;
    };
    YoutubeNodeView.prototype.destroy = function () {
        if (this.deleteUnlisten) {
            this.deleteUnlisten();
        }
    };
    YoutubeNodeView.prototype.stopEvent = function (event) {
        return false;
    };
    YoutubeNodeView.prototype.ignoreMutation = function () {
        return true;
    };
    return YoutubeNodeView;
}());
export { YoutubeNodeView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsicHJvc2VtaXJyb3Ivdmlld3MveW91dHViZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUdyRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsRUFBVSxFQUFFLEtBQWM7SUFFMUQsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUN4QixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLG1DQUFpQyxFQUFFLElBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQztJQUNwRixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN6QixNQUFNLENBQUMsS0FBSyxHQUFHLHlFQUF5RSxDQUFDO0lBQ3pGLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBRTlCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCw4Q0FBOEM7QUFDOUM7SUFFSSx5QkFBWSxJQUFVLEVBQVksSUFBZ0IsRUFBRSxZQUEwQjtRQUE5RSxpQkE2QkM7UUE3QmlDLFNBQUksR0FBSixJQUFJLENBQVk7UUFFOUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUzRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBRXhDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFFOUYsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFNTyxvQ0FBVSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sSUFBVTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxpQ0FBTyxHQUFQO1FBRUksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsS0FBWTtRQUNsQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7Tm9kZX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQge3JlbW92ZVNlbGVjdGVkTm9kZX0gZnJvbSBcInByb3NlbWlycm9yLXV0aWxzXCI7XG5pbXBvcnQge0VkaXRvclZpZXcsIE5vZGVWaWV3fSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlWW91dHViZUlmcmFtZShpZDogc3RyaW5nLCBzdGFydD86IHN0cmluZykge1xuXG4gICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgICBpZnJhbWUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuICAgIGlmcmFtZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIGlmcmFtZS5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHtpZH0ke3N0YXJ0ID8gXCI/c3RhcnQ9XCIgKyBzdGFydCA6IFwiXCJ9YDtcbiAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSBcIjBcIjtcbiAgICBpZnJhbWUuYWxsb3cgPSBcImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlXCI7XG4gICAgaWZyYW1lLmFsbG93RnVsbHNjcmVlbiA9IHRydWU7XG5cbiAgICByZXR1cm4gaWZyYW1lO1xufVxuXG4vLyBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PW0zVjdfT3Y1MnNZXG5leHBvcnQgY2xhc3MgWW91dHViZU5vZGVWaWV3IGltcGxlbWVudHMgTm9kZVZpZXcge1xuXG4gICAgY29uc3RydWN0b3Iobm9kZTogTm9kZSwgcHJvdGVjdGVkIHZpZXc6IEVkaXRvclZpZXcsIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7XG5cbiAgICAgICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmRvbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgdGhpcy5kb20uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICB0aGlzLmRvbS5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLm1hcmdpblRvcCA9IFwiMTZweFwiO1xuICAgICAgICB0aGlzLmRvbS5zZXRBdHRyaWJ1dGUoXCJuby1ibHVyXCIsIFwiXCIpO1xuXG4gICAgICAgIHRoaXMuZG9tLmFwcGVuZENoaWxkKGNyZWF0ZVlvdXR1YmVJZnJhbWUobm9kZS5hdHRycy5pZCwgbm9kZS5hdHRycy5zdGFydCkpO1xuXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmRvbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgICAgICBvdmVybGF5LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uID0gb3ZlcmxheS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW9uLWJ1dHRvblwiKSk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaW9ueC0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjb2xvclwiLCBcInByaW1hcnlcIik7XG4gICAgICAgIHRoaXMuZGVsZXRlVW5saXN0ZW4gPSBldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihidXR0b24sIFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5kZWxldGVOb2RlKCkpO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW9uLWljb25cIik7XG4gICAgICAgIGljb24uc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRyYXNoXCIpO1xuICAgICAgICBpY29uLnNsb3QgPSBcImljb24tb25seVwiO1xuICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWxldGVVbmxpc3RlbjogRnVuY3Rpb247XG5cbiAgICBkb206IEhUTUxFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBkZWxldGVOb2RlKCkge1xuICAgICAgICB0aGlzLnZpZXcuZGlzcGF0Y2gocmVtb3ZlU2VsZWN0ZWROb2RlKHRoaXMudmlldy5zdGF0ZS50cikpO1xuICAgIH1cblxuICAgIHNlbGVjdE5vZGUoKSB7XG4gICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoXCJpb254LS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdE5vZGUoKSB7XG4gICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5yZW1vdmUoXCJpb254LS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICB1cGRhdGUobm9kZTogTm9kZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcblxuICAgICAgICBpZiAodGhpcy5kZWxldGVVbmxpc3Rlbikge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVVbmxpc3RlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWdub3JlTXV0YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiJdfQ==