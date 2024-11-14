import pika

params = pika.URLParameters('amqps://tkprcqtw:VAtik4GJ_uzYpfeK7dZnP-b4WNLyRXs8@cow.rmq2.cloudamqp.com/tkprcqtw')
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='admin')
channel.queue_declare(queue='response')

def publish(method, body):
    print("Sending:", body)
    properties = pika.BasicProperties(method)
    message = body
    channel.basic_publish(exchange='', routing_key='admin', body=message, properties=properties)
    print('Message sent')

def on_response(ch, method, properties, body):
    print(body.decode())

channel.basic_consume(queue='response', on_message_callback=on_response, auto_ack=True)

r = input()

publish('smthng', '''def publish(method, body):
    print("Sending:", body)
    properties = pika.BasicProperties(method)
    message = body
    channel.basic_publish(exchange='', routing_key='admin', body=message, properties=properties)
    print('Message sent')''')

print('Waiting for response from Service B')
channel.start_consuming()
