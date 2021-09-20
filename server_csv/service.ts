import fs from 'fs'
import { encodeComma, decodeComma } from './enDeCode'

export class Service {
    constructor() {
    }

 

    async readTodoList() {
        const filePath = __dirname + '/TodoList.csv'
        const data = await fs.promises.readFile(filePath, 'utf-8')
        const lines = data.split('\n')
        let result: [] = []
        const headers = lines[0].split(',')
        for (let i = 1; i < lines.length; i++) {
            if (lines[i] == undefined || lines[i].trim() == "") {
                continue;
            }
            let words = lines[i].split(',');
            let task: {} = {};
            for (let j = 0; j < words.length; j++) {
                task[headers[j].trim()] = decodeComma(words[j]);
            }
            // @ts-ignore
            result.push(task);
        }
        return result;
    }

    async addTodoList(
        post: {
            id: string,
            name: string,
            description: string,
            assignedto: string,
            duedate: string,
            status: string,
        }
    ) {

        const filePath = __dirname + '/TodoList.csv'
        console.log(post)
        const reformedInput = "\n" + post.id + "," + encodeComma(post.name) + "," + encodeComma(post.description) + "," + encodeComma(post.assignedto) + "," + encodeComma(post.duedate) + "," + encodeComma(post.status)

        // debug
        // console.log('encoded comma: ' + reformedInput)

        await fs.appendFile(filePath, reformedInput, (e) => console.log(e))

        const csvFileData = await fs.readFileSync(filePath, 'utf8')
        console.log(csvFileData)
        return { 'status': 'ok' }
    }

    async deleteTodoList(id: string) {

        const filePath = __dirname + '/TodoList.csv'
        const data = await fs.promises.readFile(filePath, 'utf-8')
        const lines = data.split('\n')
        let result: string = "";
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] == undefined || lines[i].trim() == "") continue;
            let words = lines[i].split(',');
            if (words[0] == id) continue;
            result = result + lines[i] + "\n"
        }
        await fs.promises.writeFile(filePath, result)

        return { 'result': 'deleted' }
    }

    // [done]
    async updateTodoList(
        id: string,
        name: string,
        description: string,
        assignedto: string,
        duedate: string,
        status: string) {

        const filePath = __dirname + '/TodoList.csv'
        const data = await fs.promises.readFile(filePath, 'utf-8')
        const lines = data.split('\n')
        let result: string = "";
        // console.log("service " + id + name + description + assignedto + duedate + status )
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] == undefined || lines[i].trim() == "") continue;
            let words = lines[i].split(',');
            console.log(`words[0]: ${words[0]}, id: ${id}, ${words[0] == id}`)
            if (words[0] == id) {
                words[1] = encodeComma("" + name);
                words[2] = encodeComma("" + description);
                words[3] = encodeComma("" + assignedto);
                words[4] = encodeComma("" + duedate);
                words[5] = encodeComma("" + status);
                result = result + words.join(',') + "\n"
            } else {
                result = result + lines[i] + "\n"
            }
        }
        await fs.promises.writeFile(filePath, result)

        return { 'result': 'updated' }
    }
}