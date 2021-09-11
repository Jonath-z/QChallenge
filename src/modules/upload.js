import storage  from "./firbaseConfig";

const upload = (file) => {
    if (file === null) {
        alert('file is null');
    }
    const ref = storage.ref(`/avatar/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on('state_changed',
        (snapshot) => {
            console.log(snapshot);

        },
        (err) => { console.log(err) },
        () => {
            storage.ref('avatar').child(file.name).getDownloadURL()
                .then(url => {
                    console.log(url);
            })
        }
    )
}

export default upload;