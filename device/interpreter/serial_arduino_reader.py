import serial
import requests
from time import sleep

serial_port = '/dev/cu.usbserial-AD024JKX';
baud_rate = 9600; #In arduino, Serial.begin(baud_rate)
write_to_file_path = "output.txt";

ser = serial.Serial(serial_port, baud_rate)
while True:
    line = ser.readline();
    line = line.decode("utf-8") #ser.readline returns a binary, convert to string
    tag_name = line.replace(" ", "").replace("\n", "")
    print(f'Tag_name = {tag_name}');
    
    base_url = 'https://smartroad-backend-uerfdgcurq-uc.a.run.app'

    auth = {'cpf': '123.123.123-12', 'senha': '321321'}

    token = requests.post(f'{base_url}/sessions', json=auth)

    token = token.json()['token']

    local_id = 1

    leitura = requests.post(f'{base_url}/leituras/local?tag_name={tag_name}&local_id={local_id}')

    if 'id' in leitura.json(): 
        print(f'Leitura gravada com sucesso - ID: {leitura.json()["id"]}')

    sleep(1)
    