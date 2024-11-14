import pika

params = pika.URLParameters('amqps://tkprcqtw:VAtik4GJ_uzYpfeK7dZnP-b4WNLyRXs8@cow.rmq2.cloudamqp.com/tkprcqtw')
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='admin')
channel.queue_declare(queue='response')

def callback(ch, method, properties, body):
    print('Received in admin:', body.decode())

    response_message = 'Hell yea!'
    channel.basic_publish(exchange='', routing_key='response', body=response_message)
    print('Sent response')


channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print('Started Consuming')
channel.start_consuming()
