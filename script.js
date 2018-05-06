class ListItem extends React.Component {
	render() {
		return (
			<div>
				<div id="userImage">
					<img id="profileImg" src={this.props.profile_image_url} alt="profile image" />
				</div>
				<div id="content">
					<div id="title">
						<div id="name"><strong>{this.props.name} </strong></div>
						<div id="screenName">@{this.props.screen_name}</div>
						<div id="dot">.</div>
						<div id="time">{this.props.created_at}</div>
					</div>
					<div id="message">
						{this.props.text} <a href={this.props.link}>{this.props.link}</a>
					</div>
				</div>
				<div id="response">
					<div id="retweet">
						<i className="fas fa-retweet" /> <span id="tweetCountText">{this.props.retweet_count}</span>
					</div>
					<div id="favCount">
						<i className="far fa-heart" /> <span id="favCountText">{this.props.favorite_count}</span>
					</div>
				</div>
				<hr />
			</div>
		);
	}
}

class List extends React.Component {
	roundToNearestThousand(inputNumber) {
		if (inputNumber > 9999) {
			let result = Math.round(inputNumber / 1000);
			return result + 'K';
		} else if (inputNumber > 999) {
			let result = Math.round(inputNumber / 100) / 10;
			return result + 'K';
		} else {
			return inputNumber;
		}
	}

	regexText(post) {
		const regex = /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g;
		let text = post.replace(regex, '');
		return text;
	}

	regexLink(post) {
		const regex = /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g;
		let link = post.match(regex);
		return link;
	}

	render() {
		let itemsElements = this.props.items.map((item, index) => {
			return (
				<ListItem
					profile_image_url={item.user.profile_image_url}
					name={item.user.name}
					screen_name={item.user.screen_name}
					created_at={item.created_at}
					text={this.regexText(item.text)}
					link={this.regexLink(item.text)}
					retweet_count={this.roundToNearestThousand(item.retweet_count)}
					favorite_count={this.roundToNearestThousand(item.favorite_count)}
				/>
			);
		});
		return <div>{itemsElements}</div>;
	}
}

ReactDOM.render(<List items={tweets} />, document.getElementById('root'));
