export class VersionChanges{
    constructor(
        public id: string,
        public version_id: string,
        public change_name: string,
        public description_html: string,
        public description_long: string
    ){}
}