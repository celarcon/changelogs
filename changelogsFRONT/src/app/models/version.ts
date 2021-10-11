export class Version{
    constructor(
        public id: string,
        public project_id: string,
        public password: string,
        public version_name: string,
        public description: string,
        public description_html: string,
        public version_date: string,
        public state: number,
        public publisher: string
    ){}
}