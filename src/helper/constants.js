
const SessionStorageKeys = {
    Email: "Email",
    Error: 'Error',
    InviteId: 'inviteId',
    Location: "Location",
    MeetingURL: "MeetingURL",
    Name: "Name",
    NewPasswordEmail: 'newPasswordEmail',
    SessionId: "SessionId",
    SessionToken: "SessionToken",
    SocialUser: "SocialUser",
    SubjectId: 'subjectId',
    SubjectName: 'subjectName',
    TabIndex: 'TabIndex',
    UserId: "UserId",
    userEmail: 'userEmail'
}

const validation = {
    MustContain: 'Atleast 1lower,1upper,1number,1special character',
    InvalidPassWord: 'Invalid Password'
}

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];


export { SessionStorageKeys, validation, month };

