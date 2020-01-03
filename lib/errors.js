export class CommandNAKError extends Error {
  constructor(frame) {
    super(`Command Not Acknowledged (command=0x${frame.command.toString(16)})`);
    this.frame = frame;
    this.name = 'CommandNAKError';
  }
}

export class MessageNAKError extends Error {
  constructor(msg) {
    super(`Message Not Acknowledged (to=${msg.from}, cmd1=${msg.cmd1}, cmd2=${msg.cmd2}`);
    this.message = msg;
    this.name = 'MessageNAKError';
  }
}

export class TimeoutError extends Error {
  constructor() {
    super('Timed Out');
    this.name = 'TimeoutError';
  }
}

export class UnexpectedMessageError extends Error {
  constructor(msg) {
    super(`Unexpected Message (from=${msg.from}, cmd1=${msg.cmd1}, cmd2=${msg.cmd2}`);
    this.message = msg;
    this.name = 'UnexpectedMessageError';
  }
}
