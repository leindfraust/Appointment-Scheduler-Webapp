
let roomNo = null;

const joinRoomNotif = async (io, socket) => {
    const { User } = await import('./models/user.js')

    socket.on('join room', (id) => {
        socket.join(id);
        roomNo = id;
        User.find({
            _id: id
        }).then(response => {
            io.to(roomNo).emit('messages', response[0].messages);
        }).catch(error => {
            //ignore type error
        });
    });
    console.log('Client connected');
    socket.on('connect', () => console.log('Client connected'));
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', async (refID, title, msg, user, date) => {

        try {
            const patient = await User.findOneAndUpdate({
                _id: roomNo
            }, {
                $push: {
                    messages: {
                        id: refID,
                        from: user,
                        subject: title,
                        message: msg,
                        date: date,
                        new:
                            true
                    },
                },
            }, {
                new: true
            });
            io.to(roomNo).emit('send messages', patient?.messages);
        } catch (err) {
            console.log(err);
        }
    });
}

const updateMessage = async (io, socket) => {
    const { User } = await import('./models/user.js')
    socket.on('update message', async (notifications) => {
        async function updatePatient() {
            await User.findOneAndUpdate({
                _id: roomNo
            }, {
                messages: notifications
            }, {
                new: true
            });
        }

        try {
            await updatePatient();
        } catch (err) {
            console.log(err);
        }
    });
}

const deleteMessage = async (io, socket) => {
    const { User } = await import('./models/user.js')
    socket.on('delete message', async (id, notif) => {
        try {
            const patient = await User.findOneAndUpdate({
                _id: id
            }, {
                $pull: {
                    messages: {
                        id: notif.refID,
                        from: notif.user,
                        subject: notif.title,
                        message: notif.message,
                        date: notif.date,
                        new: notif.new
                    }
                }
            }, {
                new: true
            }).clone();
            io.to(roomNo).emit('delete messages', patient?.messages);
        } catch (err) {
            console.log(err);
        }
    });
}

export {
    joinRoomNotif,
    updateMessage,
    deleteMessage
}
