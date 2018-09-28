const Type = require('sywac/types/type');
class TypeSwitch extends Type {
    static get(opts) {
        return new TypeSwitch(opts);
    }

    get datatype() {
        return 'switch';
    }

    setValue(context, value) {
        if (typeof value === 'string' && value === 'true') {
            value = true;
        } else if (typeof value === 'string' && value === 'false') {
            value = false;
        }
        context.assignValue(this.id, typeof value === 'boolean' ? value : undefined);
    }
}

module.exports = TypeSwitch;
