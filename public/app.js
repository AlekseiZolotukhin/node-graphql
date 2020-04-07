new Vue({
    el: '#app',
    data() {
        return {
            isDark: true,
            show: true,
            taskTitle: '',
            tasks: []
        }
    },
    // get list of tasks on load
    created() {
        const query = `
            query {
                getTasks {
                   id name completed createdAt updatedAt
                }  
            }
        `;

        fetch('/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({query})
        })
            // parse response
            .then(res => res.json())
            // fecth data
            .then(response => {
                this.tasks = response.data.getTasks;
            })
    },
    methods: {
        addTask() {
            const name = this.taskTitle.trim();
            if (!name) {
                return
            }

            const query = `
                mutation {
                    addTask(task: {name: "${name}"}){
                      id name completed createdAt updatedAt
                    }
                }
            `;
            fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query})
            })
                // parse response
                .then(res => res.json())
                .then(response => {
                    this.tasks.push(response.data.addTask);
                })
                .catch(e => console.log(e));
            this.taskTitle = ''
        },
        // make task completed
        taskComplete(id) {
            const query = `
                mutation {
                    completeTask(id: "${id}"){
                      updatedAt
                    }
                }
            `;
            fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query})
            })
                // parse response
                .then(res => res.json())
                .then(response => {
                    const index = this.tasks.findIndex(t => t.id === id);
                    if (index) {
                        this.tasks[index].updatedAt = response.data.completeTask.updatedAt
                    }
                })
                .catch(e => console.log(e));
        },
        removeTask(id) {
            const query = `
                mutation {
                    removeTask(id: "${id}")
                }
            `;
            fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query})
            })
                // here we no need parse respone
                .then(response => {
                    this.tasks = this.tasks.filter(t => t.id !== id)
                })
                .catch(e => console.log(e));
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        // make our date formatted
        date(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            };
            if (withTime) {
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.second = '2-digit';
            }
            return new Intl.DateTimeFormat('en-GB', options).format(new Date(+value))
        }
    }
});