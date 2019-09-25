export class Barrel {
    private shooters = new Map<string, number>();

    public canShoot(member_id: string) {
        if (!this.shooters.has(member_id)) {
            return true;
        }

        let lastRunTime = this.shooters.get(member_id);
        return Date.now() - 43200 > lastRunTime;
    }

    public shoot(member_id: string) {
        this.shooters.set(member_id, Date.now());
    }
}