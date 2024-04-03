import { TitlePipe } from './title.pipe';

describe('TitlePipe', () => {
    let pipe: TitlePipe;

    beforeEach(() => {
        pipe = new TitlePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty string if value is not a string', () => {
        expect(pipe.transform(null as any)).toEqual('');
        expect(pipe.transform(undefined as any)).toEqual('');
        expect(pipe.transform(123 as any)).toEqual('');
    });

    it('should remove "Label" and capitalize the first letter', () => {
        expect(pipe.transform('LabelName')).toEqual('Name');
        expect(pipe.transform('LabelSuperhero')).toEqual('Superhero');
    });

    it('should return the same string if it does not contain "Label"', () => {
        expect(pipe.transform('Superhero')).toEqual('Superhero');
    });
});
