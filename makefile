image:
	docker build -t elb .

container:
	docker run -p 8000:8000 elb
