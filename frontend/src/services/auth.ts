class Auth {
    key = 'fifo-token';

    public hasToken() {
        return this.getToken() != null;
    }

    public getToken() {
        return localStorage.getItem(this.key);
    }

    public setToken(token: string): void {
        localStorage.setItem(this.key, token);
    }

    public destroyToken(): void {
        localStorage.removeItem(this.key);
    }
}

export default new Auth();
