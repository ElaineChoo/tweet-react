console.log(tweets);
class ListItem extends React.Component {
	render() {
		return (
			<div>
				<div id="userImage">
					<img src={this.props.profile_image_url} alt="profile image" />
				</div>
				<div id="content">
					<p>
						<strong>{this.props.name} </strong>
						<span>@{this.props.screen_name}</span>
						<span id="dot">.</span>
						<span>{this.props.created_at}</span>
					</p>
					<p>
						{this.props.text} <a href={this.props.link}>{this.props.link}</a>
					</p>
				</div>
				<div id="response">
					<div id="retweet">{this.props.retweet_count}</div>
					<div id="favCount">{this.props.favorite_count}</div>
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
