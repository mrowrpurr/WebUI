class WebUIComponentHost {
    public show(id: string) {
        alert(`You called show with: ${id}`)
    }
}

(window as any).webUI = new WebUIComponentHost()