$a = random message
push:
	git status
	git add --all
	git commit -am "${a}"
	git status
	git push
