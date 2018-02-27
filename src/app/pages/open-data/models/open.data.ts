export class OpenData {
    id: string;
    title: string;
    description: string;
    date: Date;
    createdBy: string;
    resources: Array<OpenDataMedia>;
    topics: Array<OpenDataTopic>;

    constructor (id: string, title: string, description: string, date: Date, createdBy: string, files: Array<OpenDataMedia>, topics: Array<OpenDataTopic>){
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.createdBy = createdBy;
        this.resources = files;
        this.topics = topics;        
    }
}

export class OpenDataFormat {
    id: string;
    name: string;
    icon: string;

    constructor (id: string, name: string, icon: string){
        this.id = id;
        this.name = name;
        this.icon = icon;        
    }
}

export class OpenDataTopic {
    id: string;
    name: string;
    icon: string;

    constructor (id: string, name: string, icon: string){
        this.id = id;
        this.name = name;
        this.icon = icon;        
    }
}

export class OpenDataMedia {
    id: string;
    name: string;
    url: string;
    format: string;

    constructor (id: string, name: string, url: string, format: string){
        this.id = id;
        this.name = name;
        this.url = url;
        this.format = format;   
    }
}