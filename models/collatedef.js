class CollateDef {
    getProperties(args) {
        let limit = 10, offset = 0;
        if (args.page) {
            limit = (args.page.limit > 10) ? 10 : ((args.page.limit < 0) ? 1 : args.page.limit || 10);
            offset = (args.page.offset > 10) ? 10 : ((args.page.offset < 0) ? 0 : args.page.offset || 0);
        }
        let field = 'created_at', direction = 'DESC';
        if (args.sort) {
            field = args.sort.field;
            direction = args.sort.direction;
        }
        let orderByStatement = ` ORDER BY ${field} ${direction} `;
        return [
            limit,
            offset,
            orderByStatement,
        ];
    }
}


module.exports = CollateDef;