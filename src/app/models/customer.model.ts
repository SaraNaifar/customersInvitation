import { Deserializable } from './deserializable.model';

export class Customer implements Deserializable {
    public user_id: number;
    public name: string;
    public longitude: string;
    public latitude: string; 

    public deserialize(input: any): this{
        return Object.assign(this, input);
    }
}

