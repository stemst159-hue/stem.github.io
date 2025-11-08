// Motor A connections
int ENA = 5;
int IN1 = 6;
int IN2 = 7;

// Motor B connections
int ENB = 10;
int IN3 = 8;
int IN4 = 9;

// Motor speed (0–255)
int SPEED = 200;

void setup() {
  Serial.begin(9600);

  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  stopMotors();

  Serial.println("=== L298N Car Control ===");
  Serial.println("W = Forward");
  Serial.println("S = Backward");
  Serial.println("A = Left");
  Serial.println("D = Right");
  Serial.println("X = Stop");
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();

    // Convert to uppercase (optional)
    if (cmd >= 'a' && cmd <= 'z') cmd -= 32;

    if (cmd == 'W') moveForward();
    else if (cmd == 'S') moveBackward();
    else if (cmd == 'A') turnLeft();
    else if (cmd == 'D') turnRight();
    else if (cmd == 'X') stopMotors();
  }
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENA, SPEED);
  analogWrite(ENB, SPEED);
  Serial.println("Moving Forward");
}

void moveBackward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, SPEED);
  analogWrite(ENB, SPEED);
  Serial.println("Moving Backward");
}

void turnLeft() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, SPEED);
  analogWrite(ENB, SPEED);
  Serial.println("Turning Left");
}

void turnRight() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENA, SPEED);
  analogWrite(ENB, SPEED);
  Serial.println("Turning Right");
}

void stopMotors() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  Serial.println("Stopped");
}
