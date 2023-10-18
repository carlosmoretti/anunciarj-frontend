export class MobileHelper {
    static isMobile() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;
    }
}